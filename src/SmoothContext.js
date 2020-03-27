
import EventEmitter from 'events'
import SmoothFunctions from './SmoothFunctions'
import SmoothHelper from './SmoothHelper'

// import expressions from './expressions'
import SmoothFile from './SmoothFile'
import SmoothSyntax from './SmoothSyntax'
import SmoothExpressions from './SmoothExpressions'

// Here's a stamp with public methods, and some state:
class SmoothContext {
  static eventEmitter = new EventEmitter()
  static DEFAULT_FILE_NAME = 'DEFAULT_FILE_NAME'
  static SILENT_OPTION_STRING = 'option_silence'
  static NO_MATCH_OPTION_STRING = 'option_no_match'
  static HIDDEN_OPTION_STRING = 'option_hidden'
  // this.predefinedVariables.OPTIONS_NO_BUTTONS = false
  // this.predefinedVariables.OPTIONS_BUTTON_DELAY = 0
  // this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT = false
  // this.predefinedVariables.CURRENT_FACE = ''
  static randomId = 0

  constructor (state) {
    if (!state) {
      state = {
        text: '',
        preamble: '',
        title: '',
        faces: {},
        firestore: {}
      }
    }
    this.files = {}
    this.defaultFile = new SmoothFile(state)
    this.files[SmoothContext.DEFAULT_FILE_NAME] = this.defaultFile
    this.currentFile = SmoothContext.DEFAULT_FILE_NAME

    this.functions = {}
    this.functionReturns = []
    this.variables = {}
    this.lineNumber = 0
    this.indent = 0
    this.voices = {}

    // Lookup faces by ID (store, chats view)
    this.faces = {}
    // Lookup faces by name (player)
    this.faceNameToId = {}
    this.predefinedVariables = {}

    this.options = []
    this.voice = null
    this.faceVoice = null
    this.currentFaceId = null
    this.recognitionLanguage = null

    this.htmlOutput = ''

    this.playPreamble(this.defaultFile.preambleLines)
    this.setupPredefinedVariables()

    this.readFunctions(this.defaultFile.functions)

    this.bIsTestingForErrors = false
  }
  getLines () {
    var lines = []
    if (this.currentFile && this.files[this.currentFile]) {
      lines = this.files[this.currentFile].lines
    }
    return lines
  }
  getLabels () {
    var labels = {}
    if (this.currentFile && this.files[this.currentFile]) {
      labels = this.files[this.currentFile].labels
    }
    return labels
  }
  requestFace (id, onLoadedFn, onError, bWaitForLoad) {
    SmoothContext.eventEmitter.emit('requestFace', {id: id, onLoaded: onLoadedFn, onError: onError})
  }
  speechRecognitionBlocked () {
    console.warn('Warning: speech recognition may be blocked.')
  }
  readFunctions (functionLines) {
    var cachedLineNumber = this.lineNumber
    for (var i = 0; i < functionLines.length; ++i) {
      this.lineNumber = functionLines[i]
      let functionNameAndArgs = null
      let line = this.getLines()[this.lineNumber]
      if ((functionNameAndArgs = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
        var functionName = functionNameAndArgs[1]
        if (functionName === 'function') {
          SmoothFunctions.execFunc(this, functionName, functionNameAndArgs[2])
        } else {
          throw new Error('Expected function: ' + line)
        }
      }
    }
    this.lineNumber = cachedLineNumber
  }
  isLocalStorageAvailable () {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('feature_test', 'yes')
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test')
          return true
        }
      }
      return false
    } catch (e) {
      return false
    }
  }
  setupPredefinedVariables () {
    this.predefinedVariables.OPTIONS_NO_BUTTONS = false
    // Hide buttons until delay or wrong answer
    this.predefinedVariables.OPTIONS_BUTTON_DELAY = 0
    this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT = false
    this.predefinedVariables.CURRENT_FACE = ''
    
    this.predefinedVariables.webkitSpeechRecognition = 'webkitSpeechRecognition' in window
    this.predefinedVariables.webkitSpeechRecognitionPermission = false
    if (this.isLocalStorageAvailable()) {
      var permission = window.localStorage.getItem('webkitSpeechRecognitionPermission')
      if (permission === null) {
        this.predefinedVariables.webkitSpeechRecognitionPermission = false
      } else {
        this.predefinedVariables.webkitSpeechRecognitionPermission = permission
      }
      this.predefinedVariables.localStorageAvailable = true
    } else {
      this.predefinedVariables.localStorageAvailable = false
    }
    this.predefinedVariables.numSpeechSynthesisVoices = 0
    if (typeof (speechSynthesis) !== 'undefined') {
      this.predefinedVariables.numSpeechSynthesisVoices = speechSynthesis.getVoices().length
    }
    this.predefinedVariables.LAST_RESPONSE = ''
  }
  playPreamble (lines) {
    // Execute the lines in the preamble without waiting for the function promises to resolve
    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i]
      let functionNameAndArgs = null
      if ((functionNameAndArgs = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
        var functionName = functionNameAndArgs[1]
        if (SmoothFunctions.hasFunc(functionName)) {
          SmoothFunctions.execFunc(this, functionName, functionNameAndArgs[2])
        }
      }
    }
  }
  processNonFunctionLine (str) {
    str = SmoothExpressions.replaceAndEvaluateEscapedExpressions(this, str)
    var voice = this.voice || this.faceVoice
    if (voice) {
      // strip HTML tags
      str = str.replace(/(<([^>]+)>)/ig, '')
      if (!str.length) {
        return Promise.resolve({line: this.lineNumber + 1})
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          SmoothContext.eventEmitter.emit('tts', {
            text: str,
            faceId: this.currentFaceId,
            voice: voice,
            onFinished: () => {
              resolve({line: this.lineNumber + 1})
            },
            onError: (error) => {
              throw new Error(error)
            }})
        }, 0)
      })
    } else {
      // Warning!!  SmoothScript does not do any sanitization of HTML
      // This is a security risk, allowing XSS attacks if you have a site
      // that hosts user-created content.  It is your responsibility to
      // sanitize the content!
      this.htmlOutput += str + '&nbsp;'
      return Promise.resolve()
    }
  }
  outputHTML () {
    SmoothContext.eventEmitter.emit('appendHTML', {html: this.htmlOutput})
    this.htmlOutput = ''
  }
  finish () {
    this.outputHTML()
    SmoothContext.eventEmitter.emit('finished')
    return Promise.resolve('finished')
  }
  playLineFromCurrent () {
    var lines = this.getLines()
    if (this.lineNumber >= lines.length) {
      return this.finish()
    }
    this.lineNumber = SmoothHelper.nextImportantLine(this.lineNumber, this.getLines())
    if (this.lineNumber >= lines.length) {
      return this.finish()
    }
    var playNextLineWhenDone = (newLine) => {
      this.lineNumber = newLine
      return this.playLineFromCurrent()
    }
    var line = lines[this.lineNumber]
    let functionNameAndArgs = null
    if ((functionNameAndArgs = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
      var functionName = functionNameAndArgs[1]
      if (SmoothFunctions.hasFunc(functionName)) {
        if (functionName === 'option' || functionName === 'delay') {
          this.outputHTML()
        }
        var promise = SmoothFunctions.execFunc(this, functionName, functionNameAndArgs[2])
        if (!promise || typeof promise.then !== 'function') {
          throw new Error(functionName + ' failed to return a promise!')
        }
        return promise.then(
          (resolveData) => {
            if ('finished' in resolveData && resolveData.finished) {
              return this.finish()
            }
            if ('line' in resolveData) {
              return playNextLineWhenDone(resolveData.line)
            }
          }
        )
      } else {
        throw new Error('Unknown function: ' + functionName)
      }
    } else {
      return this.processNonFunctionLine(line).then(() => {
        return playNextLineWhenDone(this.lineNumber + 1)
      })
    }
  }
  play () {
    this.lineNumber = 0
    var ret = this.playLineFromCurrent()
    return ret
  }
  getLineError (lines, lineNumber) {
    if (lineNumber >= lines.length) {
      return 'lineNumber out of range: ' + lineNumber
    }
    var line = lines[lineNumber].trim()
    // todo: check indent
    let match = null
    if ((match = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
      var command = match[1]
      var args = match[2]
      if (!(SmoothFunctions.hasFunc(command))) {
        return 'Unrecognized command: ' + command
      }
      try {
        SmoothFunctions.execFunc(this, command, args)
      } catch (error) {
        if (error.name === 'SmoothSyntaxError') {
          return error.message
        }
      }
    }
    return null
  }
  getLineErrors (lines, lineNumbers, errors) {
    this.bIsTestingForErrors = true
    for (var i = 0; i < lines.length; ++i) {
      this.lineNumber = i
      // @ todo check indent
      var error = this.getLineError(lines, i)
      if (error) {
        lineNumbers.push(this.lineNumber)
        errors.push(error)
      }
      // skip non commands.
      this.lineNumber += 1
    }
    this.bIsTestingForErrors = false
    return lineNumbers.length > 0
  }
  setOptions (options) {
    this.options = options
    if (this.bIsTestingForErrors) {
      return
    }
    this.randomId = Math.random()
    var cachededRandom = this.randomId
        ;((cachededRandom) => {
      var displayMatchFunction = () => {
        if (!this.predefinedVariables.OPTIONS_NO_BUTTONS && this.randomId === cachededRandom) {
          SmoothContext.eventEmitter.emit('displayMatches', options)
        }
      }
      if (this.predefinedVariables.OPTIONS_NO_BUTTONS ||
          options.hiddenOptions.length ||
          this.recognitionLanguage ||
          this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT) {
        SmoothContext.eventEmitter.emit('startListening', this.recognitionLanguage)
      }
      setTimeout(() => {
        displayMatchFunction()
      }, this.predefinedVariables.OPTIONS_BUTTON_DELAY)
    })(cachededRandom)
  }
  submitInput (input, bIsFinal) {
    var result = this.options.submitInput(input, bIsFinal)
    if (input !== SmoothContext.SILENT_OPTION_STRING) {
      this.predefinedVariables.LAST_RESPONSE = input
    }
    if (result) {
      this.randomId = Math.random()
      this.lineNumber = result.line
      SmoothContext.eventEmitter.emit('clearHTML')
      this.indent = SmoothHelper.getIndent(this.getLines()[this.lineNumber])
      SmoothContext.eventEmitter.emit('stopListening')
      SmoothContext.eventEmitter.emit('hideMatches')
      this.options.resolveFunc(result)
    } else if (bIsFinal && !this.predefinedVariables.OPTIONS_NO_BUTTONS) {
      SmoothContext.eventEmitter.emit('displayMatches', this.options)
    }
  }
}

export default SmoothContext
