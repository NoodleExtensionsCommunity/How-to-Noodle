# How to use Contains

It's as the method says, you use `Contains` to get an object that *contains* another object.
One drawback with this approach, is that it is *not* futureproof. If you want something that is more 
robust, we recommend using [Regex.](https://github.com/stormpacer/how-to-noodle/how-tos/regex/README.md/)

```js
_environment.push(
    {
        "_id" : "PillarPair.PillarR",
        "_lookupMethod" : "Contains",
        "_active" : false
    }
)
```