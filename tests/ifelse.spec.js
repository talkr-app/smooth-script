/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

describe('If and Else', () => {
  test('else', () => {
    var ctx = new SmoothContext({text: 'if(false)\n  var(x,true)\nelse()\n  var(x, false)'})
    ctx.play().then((data) => {
      expect(ctx.variables['x']).toEqual(false)
    })
  })
})
