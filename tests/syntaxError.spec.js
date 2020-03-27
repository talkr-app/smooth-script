/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

function hasError (fileText) {
  var bHasError = false
  try {
    var ctx = new SmoothContext({text: fileText})
    ctx.play()
  } catch (error) {
    bHasError = error
  }
  return bHasError !== false
}

function hasNoError (fileText) {
  var lineNumbers = []
  var errors = []
  var ctx = new SmoothContext({text: fileText})
  ctx.getLineErrors(ctx.getLines(), lineNumbers, errors)
  return lineNumbers.length === 0
}

describe('Errors should be captured', () => {
  test('operators should be evaluated correctly', () => {
    // No args
    expect(hasError('var()')).toEqual(true)
    expect(hasError('if()')).toEqual(true)
    expect(hasError('else()')).toEqual(true)
    expect(hasError('function()')).toEqual(true)
    expect(hasError('option()')).toEqual(true)
    expect(hasError('recognition()')).toEqual(true)
    expect(hasError('create_face()')).toEqual(true)
    expect(hasError('create_voice()')).toEqual(true)
    expect(hasError('label()')).toEqual(true)
    expect(hasError('goto()')).toEqual(true)

    // Face & voice are allowed to have no args
    expect(hasError('face()')).toEqual(false)
    expect(hasError('voice()')).toEqual(false)
  })
})

describe('Clean code shoud compile', () => {
  test('operators should be evaluated correctly', () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fileText = '\
      var(test, "correct")\n\
      delay(1)\n\
      if(test="correct")\n\
        how about that\n\
      function("printVar", var1)\n\
        ${var1}\n\
      end()\n\
      exec("printVar", "test")\n'
    expect(hasNoError(fileText)).toEqual(true)
  })
})
