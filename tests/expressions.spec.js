/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

function testVariableName (text, variableName) {
  var ctx = new SmoothContext({text: text})
  ctx.play()
  return ctx.variables[variableName]
}

describe('Math', () => {
  test('operators should be evaluated correctly', () => {
    expect(testVariableName('var(x, 1+1)', 'x')).toEqual(2)
    expect(testVariableName('var(x, 2*2)', 'x')).toEqual(4)
    expect(testVariableName('var(x, 4-1)', 'x')).toEqual(3)
    expect(testVariableName('var(x, 6/2)', 'x')).toEqual(3)
  })
})

describe('Types', () => {
  test('types should be evaluated correctly', () => {
    expect(testVariableName('var(x, true)', 'x')).toEqual(true)
    expect(testVariableName('var(x, "strings")', 'x')).toEqual('strings')
  })
})

describe('Equality', () => {
  test('equality operators should be evaluated correctly', () => {
    expect(testVariableName('var(x, 2=2)', 'x')).toEqual(true)
    expect(testVariableName('var(x, 2=1)', 'x')).toEqual(false)
    expect(testVariableName('var(x, 2!=2)', 'x')).toEqual(false)
    expect(testVariableName('var(x, 2!=1)', 'x')).toEqual(true)
    expect(testVariableName('var(x, 2>=1)', 'x')).toEqual(true)
    expect(testVariableName('var(x, 2<=1)', 'x')).toEqual(false)
    expect(testVariableName('var(x, 2>1)', 'x')).toEqual(true)
    expect(testVariableName('var(x, 2<1)', 'x')).toEqual(false)
  })
})

describe('Parenthesis', () => {
  test('expressions with parenthesis should be evaluated correctly', () => {
    expect(testVariableName('var(x, (1 + 2) * 2 )', 'x')).toEqual(6)
  })
})

describe('Strings', () => {
  test('string operations', () => {
    expect(testVariableName('var(x, "test" + "me")', 'x')).toEqual('testme')
  })
})

describe('Boolean', () => {
  test('boolean operations', () => {
    expect(testVariableName('var(x, true || false)', 'x')).toEqual(true)
    expect(testVariableName('var(x, false && false)', 'x')).toEqual(false)
  })
})

describe(' variables', () => {
  test('escaped variables', () => {
    var ctx = new SmoothContext({text: 'var(y, "test")\nvar(x, "{{y}}")'})
    ctx.play().then(() => {
      expect(ctx.variables['x']).toEqual('test')
    })
  })
})
