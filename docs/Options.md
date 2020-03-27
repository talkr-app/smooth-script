# Option

As described on the [Functions](Functions.md) page, the option function presents a choice to the user:

```
Enter?
option("yes")
  You go inside.
  finish()
option("no")
  You stay outside.
  finish()
```

The story branches, and indentation is used to differentiate the branches.

But there is far more to this powerful command...

## Single Option

Sometimes you may want to present a single option to the user.  You may want to break up the story, or force the user to say something or click on something to continue. Because the story doesn't branch there is no need for indentation:

```
You walk up to the door.
option("Open the door")
You open the door and walk out, a cool breeze blows through your hair.
```

## Arbitrary Text

In the examples above, pre-defined choices were offered to the user.  Getting and matching arbitrary text from the user is also supported.  To do this, specify the "OPTION_NO_MATCH" string as an option.  This signals that you are interested in what happens when none of the pre-defined choices are selected (even if there are no predefined choices). 

```
What is your favorite color?
option("OPTION_NO_MATCH")
Mine too!
```

When options include the "OPTION_NO_MATCH" string, a text input field is shown so that the user can enter arbitrary text.  (Note: when speech recognition is enabled, a text input field is always shown)

### Matching Arbitrary Text

To match arbitrary text input, keep the following rules in mind:

* matches are not case sensitive.  "No" will match "NO" and "no"
* partial matches work.  If the user says "No, not today", this could trigger any of the following options: "No", "today", "Not Today"
* subsequent arguments to the option function provide alternative matches (but are never displayed as an option to click)

```
Do you like cheese?
option("yes", "yeah", "yup", "sure", "sometimes")
  ...
```


### Matching Silence

"OPTION_SILENCE" will match when no speech is recognized in the given language.

### Hiding an Option

Adding "OPTION_HIDDEN" after the first argument will hide the option, so no button is displayed. This will force a text bar to be displayed so the user can enter arbitrary text. (set the OPTIONS_SHOW_TEXT_INPUT [variable](Variables.md) to true to always show the text bar)

```
Are you good or bad?
option("good")
  You are good
  finish()
option("bad")
  You are bad
  finish()
option("neither", "OPTION_HIDDEN")
  You defy all labels.
  finish()
```


