import SmoothSyntax from './SmoothSyntax'
import SmoothExpressions from './SmoothExpressions'
const SmoothHelper = {
  getSimpleQuotedStringWithoutQuotes: function (str) {
    str = str.trim()
    if (str.length < 2) {
      throw new Error('Expected quoted string')
    }
    if (str[0] === '"' && str[str.length - 1] === '"') {
      return str.substring(1, str.length - 1)
    }
  },
  nextImportantLine: function (lineNumber, lines) {
    var numLines = lines.length
    for (var i = lineNumber; i < numLines; ++i) {
      if (lines[i].trim() && SmoothSyntax.comment.exec(lines[i]) === null) {
        return i
      }
    }
    return i
  },
  getIndent: function (str) {
    if (str) {
      return str.search(/\S|$/)
    }
    return 0
  },
  requireIndentIncrease: function (context, lineNumber) {
    var lines = context.getLines()
    var indent = SmoothHelper.getIndent(lines[lineNumber])
    if (lineNumber > lines.length - 2) {
      context.lineNumber = lineNumber
      throw new Error('Can not end on block that requires indent')
    }
    var blockIndent = SmoothHelper.getIndent(lines[lineNumber + 1])
    if (blockIndent <= indent) {
      context.lineNumber = lineNumber
      throw new Error('Block requires increased indent')
    }
  },
  lastLineInBlock: function (lines, lineNumber) {
    var indentToMatch = this.getIndent(lines[lineNumber])
    var cachedLine = lineNumber + 1
    for (var i = cachedLine; i < lines.length; ++i) {
      i = SmoothHelper.nextImportantLine(i, lines)
      var indent = this.getIndent(lines[i])
      if (indentToMatch >= indent) {
        return cachedLine
      }
      cachedLine = i
    }
    return cachedLine
  },
  nextLineAfterBlock: function (lines, lineNumber) {
    var indentToMatch = this.getIndent(lines[lineNumber])
    for (var i = lineNumber + 1; i < lines.length; ++i) {
      i = SmoothHelper.nextImportantLine(i, lines)
      var indent = this.getIndent(lines[i])
      if (indentToMatch >= indent) {
        return i
      }
    }
    return i
  },
  getOptions: function (context, lineNumber) {
    var lines = context.getLines()
    if (lineNumber > lines.length - 2) {
      throw new Error('Unexpected end to story looking for option')
    }
    var original = this.getIndent(lines[lineNumber])
    var optionLines = []
    var nextLineAfterBlock = lineNumber
    while (nextLineAfterBlock < lines.length) {
      var indent = this.getIndent(lines[nextLineAfterBlock])
      if (indent < original) {
        return optionLines
      }
      if (indent === original) {
        if (SmoothSyntax.optionFunction.exec(lines[nextLineAfterBlock]) === null) {
          context.lineNumber = nextLineAfterBlock
          // in this case, there is only a single option.
          return optionLines
        } else {
          optionLines.push(nextLineAfterBlock)
        }
      }
      nextLineAfterBlock = this.nextLineAfterBlock(lines, nextLineAfterBlock)
    }
    return optionLines
  },
  // Returns {"4": ["Option text at line 4"], "8": ["Option text at line 8", "alternate"]}
  getOptionTextDict: function (context, lineNumber) {
    var options = this.getOptions(context, lineNumber)
    var optionDict = {}
    for (var i = 0; i < options.length; ++i) {
      lineNumber = options[i]
      var line = context.getLines()[lineNumber]
      var args = SmoothExpressions.getArgArray(context, SmoothSyntax.functionNameAndArgs.exec(line)[2])
      optionDict[lineNumber.toString()] = args
    }
    return optionDict
  },
  parse_create_face_args: function (args) {
    if (SmoothSyntax.escapedExpression.exec(args)) {
      throw new Error('create_face is not allowed to have variables')
    }
    var argArray = SmoothExpressions.getArgStringArray(args)
    if (argArray.length < 2) {
      throw new Error('create_face requires at least 2 arguments')
    }
    for (var j = 0; j < argArray.length; ++j) {
      if (argArray[j].length === 0 || argArray[j][0] !== '"') {
        throw new Error('Arg ' + j + ' of create_face must be quoted string')
      }
    }
    var id = SmoothExpressions.getQuotedString(argArray[0]).substring(1, argArray[0].length - 1)
    var name = SmoothExpressions.getQuotedString(argArray[1]).substring(1, argArray[1].length - 1)
    var apng = ''
    var thumb = ''
    if (argArray.length > 2) {
      apng = SmoothExpressions.getQuotedString(argArray[2]).substring(1, argArray[2].length - 1)
    }
    if (argArray.length > 3) {
      thumb = SmoothExpressions.getQuotedString(argArray[3]).substring(1, argArray[3].length - 1)
    }
    return {
      id: id,
      apng: apng,
      thumb: thumb,
      name: name
    }
  }
}
export default SmoothHelper
