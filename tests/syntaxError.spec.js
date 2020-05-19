/* eslint-disable no-multi-str */
/* eslint-disable no-undef */
import SmoothContext from 'SmoothContext'
// import SmoothTest from 'SmoothTest'

function getNumSyntaxErrors (fileText) {
  var ctx = new SmoothContext({text: fileText})

  try {
    return ctx.play().then(() => {
      return Promise.resolve(0)
    // eslint-disable-next-line handle-callback-err
    })
  } catch (error) {
    return Promise.resolve(1)
  }
}

describe('Errors should be captured', () => {
  test('var should be evaluated correctly', done => {
    getNumSyntaxErrors('var()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('if should be evaluated correctly', done => {
    getNumSyntaxErrors('if()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('else should be evaluated correctly', done => {
    getNumSyntaxErrors('else()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('function should be evaluated correctly', done => {
    getNumSyntaxErrors('function()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('recognition should be evaluated correctly', done => {
    getNumSyntaxErrors('recognition()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('create_face should be evaluated correctly', done => {
    getNumSyntaxErrors('create_face()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('create_voice should be evaluated correctly', done => {
    getNumSyntaxErrors('create_voice()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('label should be evaluated correctly', done => {
    getNumSyntaxErrors('label()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('goto should be evaluated correctly', done => {
    getNumSyntaxErrors('goto()').then((numErrors) => {
      expect(numErrors).toEqual(1)
      done()
    })
  })
  test('face should be evaluated correctly', done => {
    getNumSyntaxErrors('face()').then((numErrors) => {
      expect(numErrors).toEqual(0)
      done()
    })
  })
  test('voice should be evaluated correctly', done => {
    getNumSyntaxErrors('voice()').then((numErrors) => {
      expect(numErrors).toEqual(0)
      done()
    })
  })
/*
    expect(hasError('else()')).toEqual(true)
    expect(hasError('function()')).toEqual(true)
    expect(hasError('recognition()')).toEqual(true)
    expect(hasError('create_face()')).toEqual(true)
    expect(hasError('create_voice()')).toEqual(true)
    expect(hasError('label()')).toEqual(true)
    expect(hasError('goto()')).toEqual(true)

    // Face & voice are allowed to have no args
    expect(hasError('face()')).toEqual(false)
    expect(hasError('voice()')).toEqual(false)
    */
})

describe('Clean code shoud compile', () => {
  test('operators should be evaluated correctly', done => {
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

    getNumSyntaxErrors(fileText).then((numErrors) => {
      expect(numErrors).toEqual(0)
      done()
    })
  })
})
