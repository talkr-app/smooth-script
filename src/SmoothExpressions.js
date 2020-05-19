import SmoothSyntax from './SmoothSyntax'

const SmoothExpressions = {
  'operations': {
    '+': (l, r) => {
      return l + r
    },
    '-': (l, r) => {
      return l - r
    },
    '=': (l, r) => {
      return l === r
    },
    '!=': (l, r) => {
      return l !== r
    },
    '>=': (l, r) => {
      return l >= r
    },
    '<=': (l, r) => {
      return l <= r
    },
    '>': (l, r) => {
      return l > r
    },
    '<': (l, r) => {
      return l < r
    },
    '*': (l, r) => {
      return l * r
    },
    '/': (l, r) => {
      if (r === 0) {
        throw new Error('Divide by zero')
      }
      return l / r
    },
    '&&': (l, r) => {
      return l && r
    },
    '||': (l, r) => {
      return l || r
    }
  },
  'macros': { // single-argument functions
    // Add to SmoothSyntax macro regex when adding a new one
    'rand': (max) => {
      // return a random integer less than the arg specified (or 0)
      return Math.floor(Math.random() * Math.floor(max))
    },
    'length': (str) => {
      if (!isNaN(str)) {
        str = str.toString()
      }
      return str.length
    },
    'not': (bool) => {
      return !bool
    },
    'isNaN': (str) => {
      return isNaN(str)
    },
    'int': (str) => {
      return parseInt(str)
    }
  },
  // take a string starting with an open parenthesis, returns only the part of the string up until the matching ending parenthesis
  // not including the parenthesis
  getParenthesisExpression: function (str) {
    var end = ')'
    var start = '('
    var count = 0
    var bInQuote = false
    if (str[0] !== start) {
      throw new Error('Expected (')
    }
    for (var i = 0; i < str.length; ++i) {
      if (bInQuote) {
        if (str[i] === '"' && str[i - 1] !== '\\') {
          bInQuote = false
        }
      } else {
        if (str[i] === start) {
          count += 1
        } else if (str[i] === end) {
          count -= 1
        } else if (str[i] === '"') {
          bInQuote = true
        }
      }
      if (count === 0) {
        return str.substring(1, i)
      }
    }
    throw new Error('Could not find matching parenthesis')
  },
  replaceEscapedExpressions: function (context, str) {
    return str.replace(SmoothSyntax.escapedExpressionGlobal, (match) => {
      var m = SmoothSyntax.escapedExpression.exec(match)
      var value = this.evaluate(context, m[1])
      return value
    })
  },
  replaceAndEvaluateEscapedExpressions: function (context, str) {
    return str.replace(SmoothSyntax.escapedExpressionGlobal, (match) => {
      var m = SmoothSyntax.escapedExpression.exec(match)
      var value = this.evaluate(context, m[1])
      if (this.bIsVariable(value, context)) {
        return this.evaluateVariable(value, context)
      }
      return value
    })
  },
  getQuotedString: function (str, context) {
    var m = str.match(/"(?:[^"\\]|\\.)*"/)
    if (!m) {
      throw new Error('Unterminated string: ' + str)
    }
    return m[0]
  },
  bIsVariable: function (str, context) {
    if (str in context.predefinedVariables || str in context.variables) {
      return true
    }
  },
  evaluateVariable: function (str, context) {
    if (str in context.predefinedVariables) {
      return context.predefinedVariables[str]
    } else if (str in context.variables) {
      return context.variables[str]
    } else {
      throw new Error('Unkown variable: ' + str)
    }
  },
  evaluateFirstArg (context, expression) {
    let m = null
    if (!expression) {
      throw new Error('null expression')
    }
    if (expression[0] === '(') {
      // Parenthesis
      try {
        var subExpression = this.getParenthesisExpression(expression)
        var value = this.evaluate(context, subExpression)
        return {value: value, remainder: expression.substring(subExpression.length + 2).trim()}
      } catch (error) {
        throw new Error('Parenthesis error on line: ' + context.lineNumber)
      }
    } else if (expression[0] === '"') {
      // strings
      var str = this.getQuotedString(expression)
      return {value: str.substring(1, str.length - 1), remainder: expression.substring(str.length).trim()}
    } else if ((m = /^[-]?\d+(\.\d+)?/.exec(expression)) !== null) {
      // Numbers
      return {value: Number(m[0]), remainder: expression.substring(m[0].length).trim()}
    } else if ((m = /^(true|false)/.exec(expression)) !== null) {
      // Bool
      return {value: m[0] === 'true', remainder: expression.substring(m[0].length).trim()}
    } else if ((m = SmoothSyntax.macro.exec(expression)) !== null) {
      // macros functions can only have a single argument according to how we evaluate them here
      value = this.macros[m[1]](this.evaluate(context, m[2]))
      return {value: value, remainder: expression.substring(m[0].length).trim()}
    } else if ((m = SmoothSyntax.variableName.exec(expression)) !== null) {
      // Variables
      if (this.bIsVariable(m[0], context)) {
        if (context.evaluationOptions.evaluateVariables) {
          return { value: this.evaluateVariable(m[0], context), remainder: expression.substring(m[0].length).trim() }
        }
        return { value: 0, remainder: expression.substring(m[0].length).trim() }
      } else {
        throw new Error('Undefined variable: ' + m[0])
      }
    }
    throw new Error('Unknown expression value: ' + expression)
  },
  getOperatorString (str) {
    var double = str.substring(0, 2)
    if (double in this.operations) {
      return double
    } else if (str[0] in this.operations) {
      return str[0]
    }
    throw new Error('Expected operator')
  },
  getArgStringArray (string) {
    if (string.length === 0) {
      return []
    }
    // Loop through the argument string, replacing any commas inside of quotes with a unicode full-width comma (U+FF0C)
    var bInQuote = false
    var replacementCharacter = '，'
    var numReplacements = 0
    var replacedString = ''
    for (var i = 0; i < string.length; ++i) {
      if (string[i] === '"') {
        bInQuote = !bInQuote
      }
      if (bInQuote && string[i] === ',') {
        replacedString += replacementCharacter
        numReplacements += 1
      } else {
        replacedString += string[i]
      }
    }
    var args = replacedString.split(',')
    for (i = 0; i < args.length; ++i) {
      if (numReplacements > 0) {
        // If there were any full-stop commas in strings, they are now
        // regular commas.  Use an even more obscure unicode character?
        args[i] = args[i].replace('，', ',')
      }
      args[i] = args[i].trim()
    }
    return args
  },
  getArgArray (context, string) {
    var args = this.getArgStringArray(string)
    for (var i = 0; i < args.length; ++i) {
      args[i] = this.replaceEscapedExpressions(context, args[i])
      args[i] = this.evaluate(context, args[i])
    }
    return args
  },
  evaluate (context, expression) {
    if (expression === undefined) {
      throw new Error('undefined expression')
    }
    expression = expression.trim()
    var argDict = this.evaluateFirstArg(context, expression)
    expression = argDict.remainder
    var tally = argDict.value
    var iterations = 1
    while (expression) {
      var operatorString = this.getOperatorString(expression)
      expression = expression.substring(operatorString.length).trim()
      var nextArgDict = this.evaluateFirstArg(context, expression)
      expression = nextArgDict.remainder

      // We don't take into account the order of operations.
      // So  1 + 1 = 2 returns true, but 4 = 2 + 2 simplifies to false + 2 = 2
      tally = this.operations[operatorString](tally, nextArgDict.value)
      iterations += 1
    }
    if (iterations > 2) {
      console.warn('Use parenthesis to avoid potentially incorrect order of operations on line ' + (context.lineNumber + 1))
    }
    return tally
  }
}
export default SmoothExpressions
