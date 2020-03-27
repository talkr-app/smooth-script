/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

function testVariableName (text, variableName) {
  var ctx = new SmoothContext({text: text})
  ctx.play()
  return ctx.variables[variableName]
}

describe('Math', () => {
  test('macros should work', () => {
    expect(testVariableName('var(t, length("hi"))', 't')).toEqual(2)

    // It is tough to test rand for obvious reasons
    expect(testVariableName('var(t, rand(0))', 't')).toEqual(0)
    expect(testVariableName('var(t, length(rand(9)))', 't')).toEqual(1)

    expect(testVariableName('var(t, not(true))', 't')).toEqual(false)
  })
})
