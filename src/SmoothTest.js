import SmoothFunctions from './SmoothFunctions'
import SmoothContext from './SmoothContext'
import SmoothSyntax from './SmoothSyntax'

class SmoothTest {
  constructor (context) {
    this.ctx = new SmoothContext(context.defaultFile.getMinimizedJson())
    this.ctx.evaluationOptions.evaluateVariables = false
    this.ctx.evaluationOptions.unattended = true
    this.ctx.evaluationOptions.emitEvents = false
  }
  getLineError (lineNumber) {
    if (lineNumber >= this.ctx.getLines().length) {
      return 'lineNumber out of range: ' + lineNumber
    }
    this.ctx.lineNumber = lineNumber
    var line = this.ctx.getLines()[lineNumber].trim()
    // todo: check indent
    let match = null
    if ((match = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
      var command = match[1]
      var args = match[2]
      if (!(SmoothFunctions.hasFunc(command))) {
        return 'Unrecognized command: ' + command
      }
      try {
        // eslint-disable-next-line handle-callback-err
        SmoothFunctions.execFunc(this.ctx, command, args).catch((error) => {
          // ignore non-syntax errors
        })
      } catch (error) {
        if (error.name === 'SmoothSyntaxError') {
          return error.message
        }
      }
    }
    return null
  }
  getSyntaxLineErrors (lineNumbers, errors) {
    for (var i = 0; i < this.ctx.getLines().length; ++i) {
      var error = this.getLineError(i)
      if (error) {
        lineNumbers.push(i)
        errors.push(error)
      }
    }
    return lineNumbers.length > 0
  }

  getErrors () {
    return new Promise((resolve, reject) => {
      var lineNumbers = []
      var errors = []
      this.getSyntaxLineErrors(lineNumbers, errors)
      if (lineNumbers.length === 0) {
        this.getRuntimeErrors().then((data) => {
          resolve(data)
        }).catch((error) => {
          console.error(error)
        })
      } else {
        console.log('syntax errors')
        resolve({lines: lineNumbers, strings: errors})
      }
    })
  }

  getRuntimeErrors () {
    var errors = []
    var lineNumbers = []

    var originalFunctionLines = []
    var functionLines = []

    // any option not picked is added to the todo dict:
    //   todo keys are line numbers, todo objects are the variables
    // todo: {"2":{"myvar":1}}
    //
    // So in the above example we would start at line 3 after setting the variables.
    var todo = {}

    this.ctx.evaluationOptions.emitEvents = false
    this.ctx.evaluationOptions.unattended = true
    this.ctx.evaluationOptions.evaluateVariables = true
    for (var i = 0; i < this.ctx.getLines().length; ++i) {
      let line = this.ctx.getLines()[i]
      if (SmoothSyntax.functionNameAndArgs.exec(line) !== null) {
        functionLines.push(i)
        originalFunctionLines.push(i)
      }
    }

    this.ctx.lineNumber = 0
    var handleResolveDataFn = (resolveData) => {
      // remove the 'current' line of the function that sent the resolve data
      functionLines = functionLines.filter((e) => { return e !== this.ctx.lineNumber })

      var playNextTodo = () => {
        var unfinishedLines = Object.keys(todo)
        var nextLine = unfinishedLines.pop()
        while (nextLine && !functionLines.includes(parseInt(nextLine))) {
          nextLine = unfinishedLines.pop()
        }
        if (!nextLine) {
          // we are actually done.
          return Promise.resolve({lines: lineNumbers, strings: errors})
        }
        functionLines = functionLines.filter((e) => { return e !== nextLine })
        this.ctx.vars = todo[nextLine]
        this.ctx.lineNumber = parseInt(nextLine)
        delete todo[nextLine]
        return this.ctx.playLineFromCurrent(handleResolveDataFn)
      }
      if ('finished' in resolveData && resolveData.finished) {
        return playNextTodo()
      }
      if ('line' in resolveData) {
        if (originalFunctionLines.includes(resolveData.line) && !functionLines.includes(resolveData.line)) {
          // We've already played that line (a goto) so hit the next todo
          return playNextTodo()
        }
        this.ctx.lineNumber = resolveData.line
        return this.ctx.playLineFromCurrent(handleResolveDataFn)
      }
      if ('options' in resolveData) {
        // add options to todo
        for (var key in resolveData.options) {
          var optionLine = parseInt(key)
          if (functionLines.includes(optionLine)) {
            // Mark the actual (additional) option line as having been evaluated
            // The first line will have already been removed from the functionLines at the top
            functionLines = functionLines.filter((e) => { return e !== optionLine })

            // Add next line after option to "todo"
            todo[(optionLine + 1).toString()] = JSON.parse(JSON.stringify(this.ctx.variables))
          }
        }
        // If there was more than one option, it would have been added to the todo.
        // The first option is then evaluated below.
        this.ctx.lineNumber += 1
        return this.ctx.playLineFromCurrent(handleResolveDataFn)
      }
    }

    return this.ctx.play(null, handleResolveDataFn).then((doneData) => {
      return Promise.resolve({lines: lineNumbers, strings: errors})
    }).catch((err) => {
      console.error(err)
      errors.push(err)
      lineNumbers.push(this.ctx.lineNumber)
      return Promise.resolve({lines: lineNumbers, strings: errors})
    })
  }
}

export default SmoothTest
