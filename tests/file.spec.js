/* eslint-disable no-multi-str */
/* eslint-disable no-undef */

import SmoothFile from 'SmoothFile'
describe('File', () => {
  test('creation', () => {
    var file = new SmoothFile({text: 'function("test")\n  var(x,true)\nend()'})
    SmoothFile.updateWithLinks(file)
    SmoothFile.getPreviewText(file)
    SmoothFile.getFacesInLines(file.lines)
    expect(file.functions.length).toEqual(1)
  })
})
