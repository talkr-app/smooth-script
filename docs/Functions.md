# Functions

Smooth Script supports just a handful of functions to control the HTML or plain text you see. 
  * Indentation is important
  * Functions always have parenthesis, even if there are no arguments.
  * Inside the parenthesis are comma-separated arguments.
  * Unless specified otherwise below, function arguments can be an [expression](Expressions.md) 
  
    
## Important Functions

### option

An option presents a choice to the user:

```
You must choose one:
option("Red pill")
  You chose the red pill.
  finish()
option("Blue pill")
  You chose the blue pill.
  finish()
```

Notice several things:
  * Indentation is important here.  The story branches with the option command, and we use indentation to signify what is in each branch. 
  * Each indented section ends with `finish()`.  We could also use `goto("some_label")` or `end()` if we are inside a function.  Those are the only valid ways to end an option branch.
  

Check out the [Options] (Options.md) page for additional configuration parameters and more information on how options interact with speech recognition.  

### var
`var(myVar, 2)`
The var command sets a [variable](Variables.md).  The first argument is the variable, the second argument is the value.

You must use the `var` command to set a variable before you use it (unless you are inside a function).

### if & else
If and else are used to display content conditionally 
```
if(bHasWeapon)
  You kill the warlock before he speaks a word, and become the master of the realm.
else()
  You do not undertand the exact meaning of the worlock's words, but they spell "doom" for you.
The End
finished()
```
Keep in mind:
  * Indentation is important.  `if` and `else` must be followed by an indented block.
  * `else()` is not required 
  * Unlike `option`, when the if/else is finished evaluating, we can return to the previous indentation level.
  
### goto & label

goto and label are used to jump to different parts of a file.  When you "goto" a different part of a file, there is no way to get back to where you were.  Use a function if that's what you want.

The below example will either display "The End." or "Once upon a time... The End."

```
// randomly set beginning variable to true or false (0 or 1)
var(beginning, rand(2))

if(beginning) 
  goto("beginning")
else()
  goto("ending")

// Below we create the "beginning" label.  
// This is distinct from the beginning variable which is now 0 or 1
label("beginning")
Once upon a time...

label("ending")
The End.
finish()
```

### function, end & exec

Functions evaluate a set of instructions, then return control to the line where they were called.

{% raw %}
```
// Randomly shuffle the variables: var0, var1
function("shuffle_2", var0, var1)
  if(rand(2))
    var(temp, var0)
    var(var0, var1)
    var(var1, temp)
end()

exec("shuffle_2", "one", "two")

// The var0 variable is still accessible, and will be randomly 
// set to "one" or "two"
You have {{var0}} wishes.
```
{% endraw %}

  * Unlike goto, functions return control to the place where they are called with exec.
  * Indentation is important.  `function` must be followed by an indented block
  * `end()` is  required immediately after the indented function block.  If you use `goto` to escape a function block, it is your responsibility to call `end()`.

### face

The face function sets the avatar to display. It takes the name of the avatar as the only argument: `face("washington")`

Faces are intially created by the `create_face` function.  

Note: [Smooth Talkr](https://smooth.talkrapp.com) hides the complexity of the `create_face` function with a widget, but you will still need to use the `face` function to change the face.

To not show any avatar, call face without any arguments: `face()`

The face command will automatically attempt to change the voice if a voice exists with the same name as the face.  This voice will be overridden by any voice set with the voice function. So calling the `face("washington")` will set the washington face, and attempt to set the washington voice as well.

### voice

The voice function sets the text-to-speech voice (and language).  The voice will override any voice set by the face function. It takes the name of the voice as the only argument: `voice("washington")`, or no arguments to use the default voice associated with a face: `voice()`

Voices are initially created and assigned a name by the `create_voice` command.

Note: [Smooth Talkr](https://smooth.talkrapp.com) hides the complexity of the `create_face` function with a widget, but you will still need to use the `face` function to change the face.

To display text instead of speaking it, call the voice function without any arguments `voice()` and call the face function without any agruments `face()`.  If you want to display a face and display text instead of TTS, you will need to make sure that there is no corresponding voice that shares the same name as the face.

## Less Important Functions

### recognition

The recognition function turns on speech recognition (if it is available).  You can test if speech recognition is available with the `webkitSpeechRecognition` [variable](Variables.md).  Before speech recognition can work, the user will be prompted to see if they will allow the website to use the microphone.

turn on recognition, and set to US English: 
```
recognition("en-US")
```

turn off recognition: 
```
recognition()
```

### title
Sets the title of the story.  Requires simple string argument.
```
title("My Story")
```

### clear
Clears any HTML text displayed.  Called with no arguments.

### delay

delays execution for the number of milliseconds specified.

`delay(1000)` will delay for one second.

### create_face

The create_face function will download the specified face and assign it a name so that it can be displayed with the face function.

arguments:  
1. Unique ID 
2. User-friendly name.  Unique inside of the current story.
3. URL of the avatar file.
4. URL of the avatar thumbnail

All arguments must be simple quoted strings with no escaped variables.

```
create_face("id", "name", "https://apngURL.png", "https://thumbURL.jpg")
```

Although Smooth Script does not itself animate the face, it is designed to work with avatars that animate to text to speech or audio.  Animated PNG files are typically used for this purpose, but a faces can also be a static image.

Note: Due to the complexity of creating animated PNG files, and hosting them in such a way that they can be accessed via javascript (with permissive CORS settings), [Smooth Talkr](https://smooth.talkrapp.com) has a widget that you can use instead of dealing with the create_face function directly.

### create_voice

The create_voice function will create a voice object to use with a specific name.  Typically, you will create a voice object for each face created with create_face using the same name.  Then a single call to the face function will specify the voice and the face.

arguments:  
1. User-friendly name.  Unique inside of the current story.
2. locale (For english, it can be something like "en-US", "en-UK", or "en" depending on how specific you want to be)
3. gender ("male" or "female")
4. name or index (Either the name of a specific text to speech voice, or an index specifiying which voice to pick if there are multiple that satisfy the above criteria)

All arguments must be simple quoted strings with no escaped variables.

```
create_voice("washington", "en-US", "male", "Google UK English Male")
```

### random_face

Choose a random face in the story.

```
random_face()
```


Note: [Smooth Talkr](https://smooth.talkrapp.com) has a widget that you can use instead of dealing with the create_voice function directly.


