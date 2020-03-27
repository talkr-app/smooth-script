import SmoothExpressions from './SmoothExpressions'
import SmoothHelper from './SmoothHelper'
import SmoothSyntax from './SmoothSyntax'
import SmoothOptions from './SmoothOptions'
import SmoothContext from './SmoothContext'

// A custom error class for syntax errors that we can
// detect without evaluating the context.  These can then
// be flagged early while still on the edit screen.
class SmoothSyntaxError extends Error {
  constructor (...params) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SmoothSyntaxError)
    }

    this.name = 'SmoothSyntaxError'
  }
}

const SmoothFunctions = {

  currentPromise: null,
  hasFunc: (funcName) => {
    return ('_' + funcName) in SmoothFunctions
  },
  execFunc: (context, funcName, str) => {
    if (funcName === 'create_face') {
      SmoothFunctions.currentPromise =
        SmoothFunctions['_' + funcName](
          context,
          SmoothHelper.parse_create_face_args(str))
    } else if (funcName === 'create_voice' ||
        funcName === 'label' ||
        funcName === 'title' ||
        funcName === 'var' ||
        funcName === 'function') {
      SmoothFunctions.currentPromise =
        SmoothFunctions['_' + funcName](
          context,
          SmoothExpressions.getArgStringArray(str))
    } else {
      SmoothFunctions.currentPromise =
        SmoothFunctions['_' + funcName](
          context,
          SmoothExpressions.getArgArray(context, str))
    }
    return SmoothFunctions.currentPromise
  },
  _create_face: (context, face) => {
    context.faces[face.id] = {
      apng: face.apng,
      thumb: face.thumb,
      name: face.name
    }
    context.faceNameToId[face.name] = face.id

    var onError = () => {
      throw new Error('Could not load face: ' + face.id)
    }
    if (!context.currentFaceId) {
      context.currentFaceId = face.id
      context.predefinedVariables.CURRENT_FACE = face.name
    }
    var onLoaded = () => {
      if (face.id === context.currentFaceId) {
        SmoothContext.eventEmitter.emit('faceId', face.id)
      }
    }
    SmoothContext.eventEmitter.emit('requestFace', {id: face.id, apng: face.apng, thumb: face.thumb, onLoaded: onLoaded, onError: onError})
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _create_voice: (context, argArray) => {
    var stringArgs = []
    for (var i = 0; i < argArray.length; ++i) {
      stringArgs.push(argArray[i].substring(1, argArray[i].length - 1))
    }
    var expectedArguments = 4
    if (argArray.length === expectedArguments) {
      var name = stringArgs[0]
      var locale = stringArgs[1]
      var gender = stringArgs[2].toLowerCase()
      var voiceNameOrIndex = stringArgs[3]
      var index = 0
      var voiceName = null
      if (Number.isInteger(Number(voiceNameOrIndex))) {
        index = Number(voiceNameOrIndex)
      } else {
        voiceName = voiceNameOrIndex
      }
      var bIsMale = gender === 'male'
      context.voices[name] = {
        locale: locale,
        bIsMale: bIsMale,
        index: index,
        name: voiceName
      }
      if (!context.faceVoice) {
        context.faceVoice = {
          locale: locale,
          bIsMale: bIsMale,
          index: index,
          name: voiceName
        }
      }
    } else {
      throw new SmoothSyntaxError('Expected ' + expectedArguments + ' arguments to create_voice (name, locale, male/female, voiceName/index).')
    }
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _face: (context, argArray) => {
    if (argArray.length === 0) {
      context.currentFaceId = null
      SmoothContext.eventEmitter.emit('faceId', null)
      context.faceVoice = null
      return new Promise((resolve, reject) => {
        // Setting timeout to make sure we have time to complete loading the face
        // prior to making it animate.
        setTimeout(() => {
          resolve({line: context.lineNumber + 1})
        }, 0)
      })
    }
    if (argArray.length !== 1) {
      throw new SmoothSyntaxError('Expected zero or one arguments to face.')
    } else {
      var namedFace = argArray[0]
      if (!(namedFace in context.faceNameToId)) {
        throw new Error('Unknown named face: ' + namedFace + '.')
      }
      if (!context.faceNameToId[namedFace]) {
        throw new Error('context.faceNameToId has null entry for ' + namedFace)
      }
      var faceid = context.faceNameToId[namedFace]
      if (!(faceid in context.faces)) {
        throw new Error(faceid + ' not present in context.faces')
      }
      var face = context.faces[faceid]
      return new Promise((resolve, reject) => {
        var onError = () => {
          reject(new Error('Could not load face: ' + faceid))
        }
        var onLoaded = () => {
          if (namedFace in context.voices) {
            context.faceVoice = context.voices[namedFace]
          }
          context.predefinedVariables.CURRENT_FACE = namedFace
          context.currentFaceId = faceid
          SmoothContext.eventEmitter.emit('faceId', faceid)
          // Setting timeout to make sure we have time to complete loading the face
          // prior to making it animate.
          setTimeout(() => {
            resolve({line: context.lineNumber + 1})
          }, 0)
        }
        // Request the face so that we get a callback when it is ready.
        // It should have already been requested with create_face
        SmoothContext.eventEmitter.emit('requestFace', {id: faceid, apng: face.apng, thumb: face.thumb, onLoaded: onLoaded, onError: onError})
      })
    }
  },
  _voice: (context, argArray) => {
    if (argArray.length === 1) {
      var voiceName = argArray[0]
      if (voiceName in context.voices) {
        context.voice = context.voices[voiceName]
      } else {
        throw new Error('unknown voice: ' + voiceName)
      }
    } else if (argArray.length === 0) {
      context.voice = null
    } else {
      throw new SmoothSyntaxError('Expected zero or one argument to voice.')
    }
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _title: (context, argArray) => {
    // Handled in SmoothFile construction
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _label: (context, argArray) => {
    if (argArray.length === 0) {
      throw new SmoothSyntaxError('Expected label name')
    }
    // Handled in SmoothFile construction
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _option: (context, argArray) => {
    var optionDict = SmoothHelper.getOptionTextDict(context, context.lineNumber)
    var optionLinestrings = Object.keys(optionDict)
    var options = new SmoothOptions()
    for (var i = 0; i < optionLinestrings.length; ++i) {
      var optionText = optionDict[optionLinestrings[i]]
      var lineNumber = parseInt(optionLinestrings[i])
      options.addOption(optionText, lineNumber + 1)
    }
    context.setOptions(options)
    return options.promise
  },
  _if: (context, argArray) => {
    if (argArray.length !== 1) {
      throw new SmoothSyntaxError('Expected single argument to if. Got ' + argArray.length + '.')
    }
    var lines = context.getLines()
    SmoothHelper.requireIndentIncrease(context, context.lineNumber)
    var lineNumber = context.lineNumber
    // Evaluate the if statement
    if (argArray[0]) {
      lineNumber += 1
    } else {
      // Handle the else
      var possibleElse = SmoothHelper.nextLineAfterBlock(lines, lineNumber)
      if (possibleElse === lines.length) {
        return Promise.resolve({finished: true})
      }
      var line = lines[possibleElse]
      let m = null
      lineNumber = possibleElse
      if ((m = SmoothSyntax.functionNameAndArgs.exec(line)) != null) {
        if (m[1] === 'else') {
          SmoothHelper.requireIndentIncrease(context, possibleElse)
          lineNumber = possibleElse + 1
        }
      }
    }
    return Promise.resolve({line: lineNumber})
  },
  _else: (context, args) => {
    // search up for if
    var lines = context.getLines()
    var indent = SmoothHelper.getIndent(context.getLines()[context.lineNumber])
    for (var i = context.lineNumber; i >= 0; --i) {
      var newIndent = SmoothHelper.getIndent(context.getLines()[i])
      if (newIndent < indent) {
        throw new SmoothSyntaxError('Else without matching if.  Indentation must match.')
      } else if (newIndent === indent) {
        var match = SmoothSyntax.functionNameAndArgs.exec(context.getLines()[i])
        if (match && match[1] === 'if') {
          SmoothHelper.requireIndentIncrease(context, context.lineNumber)
          var lineAfterElseBlock = SmoothHelper.nextLineAfterBlock(lines, context.lineNumber)
          return Promise.resolve({line: lineAfterElseBlock})
        }
      }
    }
    throw new SmoothSyntaxError('Else without matching if')
  },
  _finish: (context, args) => {
    return Promise.resolve({finished: true})
  },
  _var: (context, stringArray) => {
    var varname = stringArray[0]
    if (stringArray.length < 2) {
      throw new SmoothSyntaxError('Expected two arguments to var. The variable and the assignment')
    }
    if (varname.length === 0) {
      throw new SmoothSyntaxError('Expected variable name')
    }
    if (SmoothSyntax.variableName.exec(varname) == null) {
      throw new SmoothSyntaxError('Invalid variable name: ' + varname + '.  Use only a-zA-Z_0-9 and start with a-zA-Z')
    }
    var replacedVariables = SmoothExpressions.replaceEscapedExpressions(context, stringArray[1])
    var value = SmoothExpressions.evaluate(context, replacedVariables)
    if (varname in context.predefinedVariables) {
      context.predefinedVariables[varname] = value
    } else {
      context.variables[varname] = value
    }
    return Promise.resolve({line: context.lineNumber + 1})
  },
  _goto: (context, args) => {
    if (args.length !== 1) {
      throw new SmoothSyntaxError('Expected one arguement')
    }
    var labelName = args[0]
    var labels = context.getLabels()
    if (!(labelName in labels)) {
      throw new Error('Unknown label')
    }
    return Promise.resolve({line: context.getLabels()[labelName]})
  },
  _delay: (context, args) => {
    if (args.length !== 1) {
      throw new SmoothSyntaxError('Expected one argument to delay')
    }
    var delay = parseInt(args[0])
    if (isNaN(delay)) {
      throw new SmoothSyntaxError('Expected integer argument to delay')
    }
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve({line: context.lineNumber + 1})
        }, delay
      )
    })
  },
  _clear: (context, args) => {
    SmoothContext.eventEmitter.emit('clearHTML')
    return Promise.resolve({line: context.lineNumber + 1})
  },
  // Currently, _function can be executed twice for a given line.  Once as part of
  // the intial readFunctions call in the context, and once when we come across it
  // during playback
  _function: (context, argStringArray) => {
    if (argStringArray.length < 1) {
      throw new SmoothSyntaxError('Expected function name argument')
    }
    var lines = context.getLines()
    var funcName = SmoothHelper.getSimpleQuotedStringWithoutQuotes(argStringArray[0])
    var functionEnd = SmoothHelper.nextLineAfterBlock(context.getLines(), context.lineNumber)
    var line = lines[functionEnd]
    let m = null
    if ((m = SmoothSyntax.functionNameAndArgs.exec(line)) != null) {
      if (m[1] !== 'end') {
        throw new SmoothSyntaxError('end() required after function')
      }
    }

    if (!(funcName in context.functions)) {
      SmoothHelper.requireIndentIncrease(context, context.lineNumber)

      var func = {
        line: context.lineNumber + 1,
        file: context.currentFile,
        args: []
      }
      for (var i = 1; i < argStringArray.length; ++i) {
        if (SmoothSyntax.variableName.exec(argStringArray[i]) == null) {
          throw new SmoothSyntaxError('invalid variable name: ' + argStringArray[i])
        }
        // Prevent errors when bIsTestingForErrors
        context.variables[argStringArray[i]] = ''

        func.args.push(argStringArray[i])
      }
      context.functions[funcName] = func
    }
    // Skip over function block and end()
    return Promise.resolve({line: functionEnd + 1})
  },
  _end: (context, args) => {
    if (context.bIsTestingForErrors) {
      return
    }
    if (context.functionReturns.length === 0) {
      throw new Error('Unexpected end of function.  No function call to return to.')
    }
    var ret = context.functionReturns.pop()

    if (!(ret.file in context.files)) {
      throw new Error('Unknown file: ' + ret.file)
    }

    // todo, when we support running functions from different files,
    // load the ret.file

    return Promise.resolve({line: ret.line})
  },
  _exec: (context, args) => {
    if (args.length === 0) {
      throw new SmoothSyntaxError('exec requires function name argument')
    }
    var funcName = args[0]
    if (!(funcName in context.functions)) {
      throw new Error('unknown function ' + funcName)
    }
    /*
      {
        file: default,
        line: 10,
        args: ['arg1', 'arg2']
      }
    */
    var func = context.functions[args[0]]
    if (func.args.length !== args.length - 1) {
      throw new SmoothSyntaxError(funcName + ' requires ' + func.args.length + ' arguments, but ' + (args.length - 1) + ' are provided.')
    }
    for (var i = 0; i < func.args.length; ++i) {
      context.variables[func.args[i]] = args[i + 1]
    }
    context.functionReturns.push({file: context.currentFile, line: context.lineNumber + 1})
    return Promise.resolve({line: func.line})
  },
  _recognition: (context, args) => {
    if (args.length === 0) {
      context.recognitionLanguage = null
    }
    if (!args[0]) {
      context.recognitionLanguage = null
    }
    if (typeof args[0] !== 'string' || args[0].length < 2) {
      throw new SmoothSyntaxError('If an argument is provided to recognition, it must be a Language code string (e.g. "en-US")')
    }
    context.recognitionLanguage = args[0]

    return Promise.resolve({line: context.lineNumber + 1})
  },
  _random_face: (context, args) => {
    var faces = Object.keys(context.files[context.currentFile].faces)
    var rand = Math.floor(Math.random() * Math.floor(faces.length))
    if (faces.length) {
      return SmoothFunctions['_face'](context, [faces[rand]])
    }
    return Promise.resolve({line: context.lineNumber + 1})
  }

}
export default SmoothFunctions
