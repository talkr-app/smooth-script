# Variables

Variables store string, integer, floating point, or boolean data.  This data can be used to customize or control the flow of the story.  Variables are set with the var or function [functions](Functions.md).
## Escaping Variables

To print the contents of the variable to the screen, or to speak it with text to speech, you will need to escape the variable inside of your text or HTML.  This is done with double curly brackets: {{variable_name}}

For example, the following will print "Hi there, Max"

{% raw %}
```
var(name, "Max")
Hi there, {{name}}
```
{% endraw %}


You can also escape variables in an [expression](Expressions.md) to evaluate dynamically created variable names. The following uses the rand [macro](Macros.md) to generate a random integer of 0 or 1, appending it to the "name" string to create either "name0" or "name1", which are both valid variable names. This string is then evaluated as a variable to print "Hi there, Jack" or "Hi there, Jill" with equal probability.

{% raw %}
```
var(name0, "Jack")
var(name1, "Jill")
Hi there, {{"name" + rand(2)}}
```
{% endraw %}

## Predefined Variables

There are some variables that are always available to you:

  * webkitSpeechRecognition - true if speech recognition is available (typically google Chrome), fale otherwise
  * webkitSpeechRecognitionPermission - true if permission has been previously granted to use speech recognition, false otherwise (stored in localStorage, which may be cleared unlike the actual permission)
  * numSpeechSynthesisVoices - the total number of text to speech voices available in the browser
  * LAST_RESPONSE - a string containing the last response spoken, typed, or chosen by the user
  * OPTIONS_NO_BUTTONS - defaults to false.  Set to true to prevent any buttons from being shown from the [options](Options.md) function (use carefully to prevent users from gettting stuck)
  * OPTIONS_BUTTON_DELAY - defaults to 0.  Set to the number of milliseconds you would like to delay buttons from showing up (to encourage users to speak or type perhaps)
  * OPTIONS_SHOW_TEXT_INPUT - defaults to false.  Set to true, to always show a text input, even if there are no hidden choices.  This can be useful if you don't want to notify the user when hidden choices are available.
  
