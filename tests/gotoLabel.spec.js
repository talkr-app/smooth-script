/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

function testVariableName (fileText, variableName) {
  var ctx = new SmoothContext({text: fileText})
  ctx.play()
  return ctx.variables[variableName]
}

describe('Math', () => {
  test('operators should be evaluated correctly', () => {
    const fileText = '\
      var(test, "correct")\n\
      goto("end")\n\
      var(test, "incorrect")\n\
      label("end")\n'
    expect(testVariableName(fileText, 'test')).toEqual('correct')
  })
})
