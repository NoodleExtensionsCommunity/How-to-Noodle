I will be very brief on this part as I am not the most comfortable with it and it's well explained on the original wiki, the only thing I will add is how to incorporate it with the script.

# How to
If you have my script you can just write the following
```js
_environment.push()
```
And we can start working now.

This will act the same as editing JSON so there shouldn't be any problems understanding it, let's look at an example:
```js
_environment.push(
    {
        "_id" : "DragonsEnvironment.[0]Environment.[15]BigSmokePS",
        "_lookupMethod" : "Contains",
        "_active" : false
    }
)
```
To quickly explain this, basically what we are doing here is writing environment data into the difficulty file. This will look for that exact id, more can be found [here](https://github.com/StormPacer/Noodle-Maps/tree/main/chroma%20logs).

There are three lookup methods: Exact, Contains and Regex. I recommend you check each one out and find the one that is right for you

And this is basically how you incorporate `_environment` into scripting.
