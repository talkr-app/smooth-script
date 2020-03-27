# Expressions

Expressions are some combination of the following types:
* bool (e.g. `true` or `false`)
* number (e.g. `22` or `45.2`)
* string (e.g. `"I am a string"`). Strings always use double-quotes.
* [variable](Variables.md) (e.g. myVar, my_var_0, MY_VAR_1)
* [macro](Macros.md) (e.g. `rand(2)`)
* escaped expression (e.g. `{{"myvar_" + rand(2)}}`). See below for more info.  

Most [functions](Functions.md) take a comma-separated list of expressions as arguments.  Escaped Expressions (see below) can also be used to output the content of variables into HTML or text to speech, or to evaluate dynamically created variable names.

## Operators

Operators must be used in between each of the above categories.

{% raw %}
```
+ 
- 
= 
!= 
>= 
<= 
> 
< 
/ 
* 
&& 
|| 
```
{% endraw %}

Javascript's evaluation rules apply when mixing types. For example:

{% raw %}
```
var(x, "abc")
var(y, 123)
x = "abc" <br>
y = 123 <br>
x || y evaluates to {{x || y}} <br>
x && y evaluates to {{x && y}} <br>
x + y evaluates to {{x + y}} <br>
```
{% endraw }}

will output the following:

```
x = "abc"
y = 123
x || y evaluates to abc
x && y evaluates to 123
x + y evaluates to abc123
```

    
## Order of Operations and Parenthesis

expressions are evaluated from left to right, without respecting the mathmatically correct "order of operations". But you can use parenthesis to have greater control over the order of operations. If you are mixing multiple operators in a single expression, you should always use parenthesis to make the order of operations clear.

Example:
`2 = 2 + 1` evaluates (counterintuitively) to true because `2 = 2` is true, and `true + 1` is also true, according to javascript's addition.
`2 = (2 + 1)` evaluates (intuitively) to false because the parenthesis are used to ensure the proper order of operations.

## Escaped Expressions

Sometimes you will want to evaluate a variable that has a dynamically generated name.  Escaped expressions are used for this purpose.  You can escape an expression by surrounding it in double curly brackets: {% raw %}`{{ expression_here }}` {% endraw %}

Here is a more useful example that stores a random greeting string in the randomGreeting variable:

{% raw %}
```
var(greeting0, "Hello")
var(greeting1, "How are you?")
var(randomGreeting, {{"greeting" + rand(2)}}
```
{% endraw %}


You can also used escaped expressions directly in your HTML or text output:

{% raw %}
```
var(greeting0, "Hello")
var(greeting1, "How are you?")
var(randomGreeting, {{"greeting" + rand(2)}})

{{randomGreeting}}
```
{% endraw %}

or even more succinctly:

{% raw %}
```
var(greeting0, "Hello")
var(greeting1, "How are you?")

{{"greeting" + rand(2)}}
```
{% endraw %}

## Examples

Increment an existing variable (this will generate an error if myVar wasn't already defined):

```
var(myVar, myVar + 1)
```


