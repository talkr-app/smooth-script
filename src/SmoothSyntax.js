// regexes can have capture groups to return the most relevant info
const SmoothSyntax = {
  comment: /^\s*\/\/(.*)/, // Comments like this one
  commentPrism: /\s*\/\/.*/,
  functionNameHighlightPrism: /[a-z_]+(?=\s*\([^)]*\))/,
  functionLinePrism: /^\s*[a-z_]+\s*\([^)]*\)/m,
  functionNameAndArgs: /^\s*([a-z_]+)\s*\((.*)\)/, // only lower-case and _ in function names
  optionFunction: /^\s*option\s*\((.*)\)/,
  variableName: /([a-zA-Z][a-zA-Z_0-9]*)/,
  escapedExpression: /{{(.*?)}}/,
  escapedExpressionGlobal: /{{(.*?)}}/g,
  escapedExpressionPrism: /{{(.*?)}}/,
  number: /^[-]?\d+(\.\d+)?/,
  // These functions require a single quoted string as arg
  title: /^\s*title\s*\(\s*"(.*)"\s*\)/,
  label: /^\s*label\s*\(\s*"(.*)"\s*\)/,
  // face doesn't require a string arg, but we look for it when guessing
  // at the first face to download.
  faceWithStringArg: /^\s*face\s*\(\s*"(.*)"\s*\)/,
  // Multiple quoted strings as args
  createFaces: /^\s*create_face\s*\(\s*(".*"\s*,\s*".*")\s*\)/,
  function: /^\s*function\s*\(\s*"([^"]*)"/,
  macro: /^(rand|length|not|isNaN|int)\s*\(\s*(\S*)\s*\)/
}
export default SmoothSyntax
