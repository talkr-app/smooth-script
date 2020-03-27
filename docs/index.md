## What Is Smooth Script?

Smooth Script is a CYOA (Choose Your Own Adventure) style scripting language for creating interactive experiences with talking animated files.  It's comprised of a handful of [Functions](Functions.md) that create dynamic HTML output based on the choices a user makes.  Smooth Script is free, even if you want to use it commercially.

This [github repo](https://github.com/talkr-app/smooth-script/) contains documentation and source code for Smooth Script.  In order to reach its full potential, Smooth Script can be combined with other javascript libraries for [text to speech](https://github.com/talkr-app/talkr-tts), and [avatars](https://github.com/talkr-app/talkr-apng).  

For a fully integrated example of Smooth Script that includes [Avatar GIF conversion](https://github.com/talkr-app/gif-talkr), try [Smooth Talkr](https://smooth.talkrapp.com).  

There isn't an open-source example of a Smooth Script implementation yet, but it is in the works.

## Talking Avatars

Smooth Script uses two links to define an avatar: a thumbnail, and the avatar itself. Smooth script also keeps track of a name and unique ID for the avatar, and provides functions for changing the avatar and the voice.  Displaying and animating the avatar is not directly handled by Smooth Script.

In [Smooth Talkr](https://smooth.talkrapp.com), the avatars are either still images or animated PNG files created from GIF files.  GIF files that come from the iOS app [talkr](https://talkrapp.com) are treated specially so that they can blink and raise eyebrows independently from talking.

## Text To Speech

Smooth Script is designed to work with the [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis) web standard, so it works flawlessly in all browsers and platforms.  Just kidding...what I meant to say was that we do our best to support as many browsers as possible, but each one works a bit differently, so problems are common.  Some problems can be worked around, others can't. Google Chrome (on desktop) is a good choice for a browser because it provides many server-based voices in addition to any voices available from your operating system.

## Speech To Text

Smooth Script is designed to work with the [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) web API, which is only currently available in Google Chrome on desktop or Android. Despite the limited platform support, if you can guarantee your users are on Google Chrome, you can create very interactive experiences.  Users on other browsers will have to type responses into a text bar instead of speaking into the microphone.

## Further Reading
* [Functions](Functions.md)
* [Expressions](Expressions.md)
* [Variables](Variables.md)
* [Options](Options.md)
