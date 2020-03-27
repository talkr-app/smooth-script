import SmoothContext from './SmoothContext'

class SmoothOptions {
  constructor () {
    this.options = {}
    this.hiddenOptions = []
    this.displayText = []
    this.resolveFunc = null
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve
    })
  }

  addOption (textOrArray, lineNumber) {
    var option = {}
    if (Array.isArray(textOrArray)) {
      option.textArray = textOrArray
    } else {
      option.textArray = [textOrArray]
    }
    option.lineNumber = lineNumber
    var key = option.textArray[0]
    var lowerCaseKey = key.toLowerCase()
    if (option.textArray.indexOf(SmoothContext.HIDDEN_OPTION_STRING) !== -1 ||
      lowerCaseKey === SmoothContext.NO_MATCH_OPTION_STRING ||
      lowerCaseKey === SmoothContext.SILENT_OPTION_STRING) {
      this.hiddenOptions.push(key)
    } else {
      this.displayText.push(key)
    }
    for (var i = 0; i < option.textArray.length; ++i) {
      lowerCaseKey = option.textArray[i].toLowerCase()
      if (lowerCaseKey in this.options) {
        this.options[lowerCaseKey].push(option)
      } else {
        this.options[lowerCaseKey] = [option]
      }
    }
  }

  submitInput (str, bIsFinal) {
    str = str.toLowerCase()
    if (bIsFinal && str !== SmoothContext.SILENT_OPTION_STRING && !(str in this.options) && (SmoothContext.NO_MATCH_OPTION_STRING in this.options)) {
      str = SmoothContext.NO_MATCH_OPTION_STRING
    }
    if (str in this.options) {
      var matchingOptions = this.options[str]
      var option = matchingOptions[Math.floor(Math.random() * matchingOptions.length)]
      var result = {line: option.lineNumber}
      this.resolveFunc(result)
      return result
    }
    return null
  }
}

export default SmoothOptions
