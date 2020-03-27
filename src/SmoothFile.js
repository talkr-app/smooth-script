
import SmoothHelper from './SmoothHelper'
import SmoothSyntax from './SmoothSyntax'
class SmoothFile {
  constructor (state) {
    this.text = ''
    this.preamble = ''
    this.title = ''
    this.firestore = {}
    if (state) {
      this.text = state.text || ''
      this.preamble = state.preamble || ''

      this.lines = this.text.split(/\r?\n/)
      this.lines.splice(0, 0, '\n') // make line indexes start at 1 (can't get Prism to start at 0)
      // Parse the preamble seperately so we can figure out the ids
      // that come from there, and also to preserve the line numbers
      // of the original text
      // this.preamble.match(/[^\r\n]+/g) || []
      this.preambleLines = this.preamble.split(/\r?\n/) || []

      this.labels = this.parseLabels()

      this.functions = this.parseFunctions()

      this.title = state.title || this.parseTitle()

      // create_face commands list all the faces in the story,
      // but they don't include links to files stored in local storage (which would be too long as base64-encoded data).
      // We don't parse the faces completely here, but we maintain the dictionary as
      // it was initialized.
      this.parseFaces()

      this.firestore = state.firestore || {}
    }
  }
  getMinimizedJson () {
    var minimized = {
      faces: this.faces,
      title: this.title,
      text: this.text,
      preamble: this.preamble,
      firestore: this.firestore
    }
    return minimized
  }
  getUpdatedJson () {
    this.parseTitle()
    this.parseFaces()
    return this.getMinimizedJson()
  }
  parseTitle () {
    var regex = SmoothSyntax.title
    for (var i = 0; i < this.lines.length; ++i) {
      var match = regex.exec(this.lines[i])
      if (match) {
        this.title = match[1]
        return this.title
      }
    }
    this.title = SmoothFile.getPreviewText(this)
    return this.title
  }
  parseLabels () {
    var labelRegex = SmoothSyntax.label
    var match
    var labels = {}
    for (var i = 0; i < this.lines.length; ++i) {
      match = labelRegex.exec(this.lines[i])
      if (match) {
        labels[match[1]] = i
      }
    }
    this.labels = labels
    return this.labels
  }
  parseFaces (lines) {
    // Get FaceIDs from preamble first
    this.preambleLines = this.preamble.split(/\r?\n/)
    var allLines = this.preambleLines.concat(this.lines)
    this.faces = SmoothFile.getFacesInLines(allLines)
    return this.faces
  }
  parseFunctions (lines) {
    this.functions = []
    for (var i = 0; i < this.lines.length; ++i) {
      var match = SmoothSyntax.function.exec(this.lines[i])
      if (match) {
        this.functions.push(i)
      }
    }
    return this.functions
  }
  static updateWithLinks (file) {
    var preamble = file.preamble
    var faceDict = file.faces
    var preambleLines = preamble.split(/\r?\n/)
    var regex = SmoothSyntax.createFaces
    file.preamble = ''
    for (var i = 0; i < preambleLines.length; ++i) {
      var match = regex.exec(preambleLines[i])
      if (match) {
        var args = match[1].split(',')
        for (var j = 0; j < args.length; ++j) {
          args[j] = args[j].trim()
        }
        var id = args[0].substring(1, args[0].length - 1) // remove quotes
        var name = args[1].substring(1, args[1].length - 1)
        if (id in faceDict && faceDict[id].apng && faceDict[id].thumb) {
          file.preamble += 'create_face("' + id + '", "' + name + '", "' + faceDict[id].apng + '", "' + faceDict[id].thumb + '")\n'
        }
      } else {
        file.preamble += preambleLines[i] + '\n'
      }
    }
  }
  static getPreviewText (file) {
    if (file.text) {
      return file.text.substr(0, 60)
    }
    return ''
  }
  static getFacesInLines (lines) {
    var faces = {}
    var regex = SmoothSyntax.createFaces
    for (var i = 0; i < lines.length; ++i) {
      var match = regex.exec(lines[i])
      if (match) {
        var face = SmoothHelper.parse_create_face_args(match[1])
        faces[face.id] = {
          apng: face.apng,
          thumb: face.thumb,
          name: face.name
        }
      }
    }
    return faces
  }
}

export default SmoothFile
