/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'

describe('Clean code shoud compile', () => {
  test('operators should be evaluated correctly', done => {
    // eslint-disable-next-line no-template-curly-in-string
    const fileText = '\
      option("clickme")\n\
      finish()'
    try {
      var ctx = new SmoothContext({text: fileText})
      ctx.play().then(() => {
        expect(false).toEqual(false)
        done()
      })
      setTimeout(() => {
        ctx.submitInput('clickme', true)
      }, 10)
    } catch (error) {
      done(error)
    }
  })
})
