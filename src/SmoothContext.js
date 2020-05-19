
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
  static PREAMBLE_FILE_NAME = 'PREAMBLE_FILE_NAME'
  static SILENT_OPTION_STRING = 'option_silence'
  static NO_MATCH_OPTION_STRING = 'option_no_match'
  static HIDDEN_OPTION_STRING = 'option_hidden'
  // this.predefinedVariables.OPTIONS_NO_BUTTONS = false
  // this.predefinedVariables.OPTIONS_BUTTON_DELAY = 0
  // this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT = false
  // this.predefinedVariables.CURRENT_FACE = ''
  static randomId = 0

  constructor (state) {
    var preamble = {
      text: '',
      preamble: '',
      title: '',
      faces: {},
      firestore: {}
    }
    if (!state) {
      state = JSON.parse(JSON.stringify(preamble))
    }
    preamble.text = state.preamble
    this.files = {}
    this.defaultFile = new SmoothFile(state)
    this.preambleFile = new SmoothFile(preamble)
    this.files[SmoothContext.DEFAULT_FILE_NAME] = this.defaultFile
    this.files[SmoothContext.PREAMBLE_FILE_NAME] = this.preambleFile
    this.currentFile = SmoothContext.DEFAULT_FILE_NAME

    this.initialFace = this.defaultFile.initialFace
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

    this.evaluationOptions = {
      unattended: false,
      emitEvents: true,
      evaluateVariables: true
    }

    this.htmlOutput = ''

    this.setupPredefinedVariables()
    this.readFunctions(this.defaultFile.functions)
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
  processNonFunctionLine (str) {
    str = SmoothExpressions.replaceAndEvaluateEscapedExpressions(this, str)

    // Warning!!  SmoothScript does not do any sanitization of HTML
    // This is a security risk, allowing XSS attacks if you have a site
    // that hosts user-created content.  It is your responsibility to
    // sanitize the content!
    this.htmlOutput += str + '&nbsp;'
    return Promise.resolve()
  }
  outputHTML () {
    var voice = this.voice || this.faceVoice
    if (voice) {
      // strip HTML tags
      var str = this.htmlOutput.replace(/(<([^>]+)>)/ig, '')
      str = str.replace(/&nbsp;/g, ' ')
      this.htmlOutput = ''
      if (!str.length) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.emitEvent('tts', {
            text: str,
            faceId: this.currentFaceId,
            voice: voice,
            onFinished: () => {
              resolve()
            },
            onError: (error) => {
              throw new Error(error)
            }})
        }, 0)
      })
    } else {
      this.emitEvent('appendHTML', {html: this.htmlOutput})
      this.htmlOutput = ''
      return Promise.resolve()
    }
  }
  finish () {
    if (this.currentFile !== SmoothContext.PREAMBLE_FILE_NAME) {
      return this.outputHTML().then(() => {
        this.emitEvent('finished')
        return Promise.resolve('finished')
      })
    } else {
      return Promise.resolve()
    }
  }
  playLineFromCurrent (handleResolveDataFn) {
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
      return this.playLineFromCurrent(handleResolveDataFn)
    }
    if (!handleResolveDataFn) {
      handleResolveDataFn = (resolveData) => {
        if ('finished' in resolveData && resolveData.finished) {
          return this.finish()
        }
        if ('line' in resolveData) {
          return playNextLineWhenDone(resolveData.line)
        }
        if ('options' in resolveData) {
          // Options should not be returned except for "testing" when handleResolveDataFn is overriden
          throw new Error('Internal Error.')
        }
        throw new Error('Unknown function return promise')
      }
    }
    var line = lines[this.lineNumber]
    let functionNameAndArgs = null
    if ((functionNameAndArgs = SmoothSyntax.functionNameAndArgs.exec(line)) !== null) {
      var functionName = functionNameAndArgs[1]
      if (SmoothFunctions.hasFunc(functionName)) {
        var promise = SmoothFunctions.execFunc(this, functionName, functionNameAndArgs[2])
        if (!promise || typeof promise.then !== 'function') {
          throw new Error(functionName + ' failed to return a promise!')
        }
        return promise.then(
          (resolveData) => {
            return handleResolveDataFn(resolveData)
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
  play (handleResolveDataPreambleFn, handleResolveDataFn) {
    this.lineNumber = 0
    if (this.files[SmoothContext.PREAMBLE_FILE_NAME].lines.length) {
      this.currentFile = SmoothContext.PREAMBLE_FILE_NAME
      return this.playLineFromCurrent(handleResolveDataPreambleFn).then(() => {
        this.currentFile = SmoothContext.DEFAULT_FILE_NAME
        this.lineNumber = 0
        return this.playLineFromCurrent(handleResolveDataFn)
      })
    } else {
      this.currentFile = SmoothContext.DEFAULT_FILE_NAME
      return this.playLineFromCurrent(handleResolveDataFn)
    }
  }

  emitEvent (name, payload) {
    if (this.evaluationOptions.emitEvents) {
      SmoothContext.eventEmitter.emit(name, payload)
    } else if (payload) {
      if (payload.onFinished) {
        // tts
        payload.onFinished()
      }
      if (payload.onLoaded) {
        // face
        payload.onLoaded()
      }
    }
  }
  setOptions (options) {
    this.options = options
    this.randomId = Math.random()
    var cachededRandom = this.randomId
        ;((cachededRandom) => {
      var displayMatchFunction = () => {
        if (!this.predefinedVariables.OPTIONS_NO_BUTTONS && this.randomId === cachededRandom) {
          this.emitEvent('displayMatches', options)
        }
      }
      if (this.predefinedVariables.OPTIONS_NO_BUTTONS ||
          options.hiddenOptions.length ||
          this.recognitionLanguage ||
          this.predefinedVariables.OPTIONS_SHOW_TEXT_INPUT) {
        this.emitEvent('startListening', this.recognitionLanguage)
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
      this.emitEvent('clearHTML')
      this.indent = SmoothHelper.getIndent(this.getLines()[this.lineNumber])
      this.emitEvent('stopListening')
      this.emitEvent('hideMatches')
      this.options.resolveFunc(result)
    } else if (bIsFinal && !this.predefinedVariables.OPTIONS_NO_BUTTONS) {
      this.emitEvent('displayMatches', this.options)
    }
  }
}

export default SmoothContext
