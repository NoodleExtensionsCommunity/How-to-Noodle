# How to use Exact

To use Exact, you have to make sure the `_lookupMethod` is set to Exact.
If its not set to Exact, your lookup might not work as intended.

`Contains` *might* work for your lookup, but if you're doing what we're doing in this example, you might want to just do
`Exact`. If you want a more robust method to look up objects, you can use [Regex.](https://github.com/stormpacer/how-to-noodle/how-tos/regex/README.md/)

The following example will return the right pillar of the pair.

```js
_environment.push(
    {
        "_id" : "BTSEnvironment.[0]Environment.[19]PillarPair (1).[1]PillarR",
        "_lookupMethod" : "Exact",
        "_active" : true
    }
)
```