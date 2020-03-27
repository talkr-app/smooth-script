/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

function hasError (fileText, option) {
  var bHasError = false
  try {
    var ctx = new SmoothContext({text: fileText})
    ctx.play()
    ctx.submitInput(option)
  } catch (error) {
    bHasError = error
  }
  return bHasError !== false
}

describe('Clean code shoud compile', () => {
  test('operators should be evaluated correctly', () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fileText = '\
      option("clickme")\n\
      finish()'
    expect(hasError(fileText, 'clickme')).toEqual(false)
  })
})
