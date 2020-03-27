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

describe('Faces', () => {
  test('creation', () => {
    expect(hasError('create_face("id","name","apng","thumb")')).toEqual(false)
  })
})
