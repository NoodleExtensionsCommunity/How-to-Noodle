# How to use Regex

### What is regex?

Regex is short for Regular Expression, and is a tool for pattern matching, and is used in Heck for environment ID matching.
We will be using [Boost Regex](https://www.boost.org/doc/libs/1_31_0/libs/regex/doc/syntax.html) for this how to, as this is what Heck uses in its LookupID dependency.

## Note
Using Regex incorrectly will cause some performance issues, try to understand Regex before using it in an actual map.

With that out of the way, here is all the important stuff:

Characters: <br>
`.` - any character <br>
`[a-z]` - single character from a to z <br>
`[a-z0-9A-Z]` - single character from a to z, 0 to 9 and A to Z <br>
`[:blank:]` - any blank character (space and tab) <br>


Amount modifiers:
`*` - 0 or more characters <br>
`+` - 1 or more characters  <br>
`{1,3}` - 1 to 3 characters <br>

OR:
`(a|b)` - matches both "a" and "b"

Examples: <br>
`[0-9]+,[0-9]+` - one or more digits followed by a comma followed by one or more digits (412,66 would match, 5a,2 wouldn't) <br>
`[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}` - Poor-man's ipv4 regex (matches 4 groups of [0-9]{1,3} separated by dots). <br>
`ba+d` - matches "bad", "baad", "baaad" etc. <br>
`b(a|e)d` - matches "bad" and "bed"

These are just **examples** of special characters, amounts or clauses. You **will** need the [documentation](https://www.boost.org/doc/libs/1_31_0/libs/regex/doc/syntax.html) to make the best use of Boost Regex.

Example of matching to an environment object:
```js
_environment.push(
    {
        "_id" : "Pillar(Pair|L|R)",
        "_lookupMethod" : "regex",
        "_active" : true
    }
)
```

This will return all 3 instances of `Pillar` appearing, first in PillarPair, then PillarL, then PillarR.