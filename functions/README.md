# Functions
So, you want to learn how to do cool animation on objects over their lifetime. This is a great place to start then, let's get going.

# Why functions
"Why should I use functions over AssignPathAnimation?" is probably what you're asking yourself. The answer is pretty simple actually, AssignPathAnimation can be very hard to work with and is not accurate with some effects.
And let's be honest, just needing to define the beat from when to when the notes should have customData added to them is a lot simpler.

# First function
Let's look at our first function:

```js
function Rotate(Start, End) {
    filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
    filterednotes.forEach(note => {
      note._customData._animation = {}
      note._customData._animation._localRotation = [[Random(0, 180), Random(0, 180), Random(0, 180), 0], [0, 0, 0, 0.5, "easeInOutExpo"]];
    })
}
```

Let's explain it's parts and what it does.
#
The function is called `rotate` and that's also how we'll call it in our script.

The `Start` and `End` value will be used to affect all the notes in that defined range.

`filterednotes.forEach(note => {` is the part where we tell the script that we want to affect every note that is between Start and End.

In the parts after that you can see we are just adding `_customData` to our notes.
#
This function will make it so the note spawns with a random rotation and rotates back to it's standard rotation when it comes to the player.

If we want to call this function in our script all we have to do is write:
```js
Rotate(10, 38.5)
```
This tells the script that all the notes between beat 10 to beat 38.5 should be affected by the function.

# Fun with functions
Now that we have a general understanding on how functions work, why don't we have some fun creating wacky animations to spice up our noodle map.

Let's say we want to have our notes start at the left side at the coordinate [-50, 0, 0] and make them come on the track a bit before the player so they can react.

```js
function leftIn(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._position = [[-50, 0, 0, 0], [0, 0, 0, 0.3, "easeInOutExpo"]];
  })
}
```
You can see some text at the end called "easeInOutExpo", that's just some optional easing, it makes the animation feel smoother.

And again if we want to use this function on notes between beat 67.25 and 75.82 (yes good number I know), we can again do:
```js
leftIn(67.25, 75.82)
```
#

Now we can get real creative with the effects.

```js
function Insert(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._noteJumpStartBeatOffset = 2;
    note._customData._animation = {}
    note._customData._animation._position = [[Random(-50, 50), Random(10, 40), Random(-20, 20), 0], [0, 0, 0, 0.3, "easeInOutExpo"]];
    note._customData._animation._localRotation = [[Random(0, 180), Random(0, 180), Random(0, 180), 0], [0, 0, 0, 0.3, "easeInOutExpo"]];
    note._customData._animation._dissolve = [[0, 0], [1, 0.1]];
    note._customData._animation._dissolveArrow = [[0, 0], [1, 0.1]];
  })
}
```

This would be no fun if I told you what it does, so why not check it out for yourself. The only thing I want to point out is `_noteJumpStartBeatOffset`.
This will spawn the note ahead of time so it stays on screen for longer.
# Note duplication

Did you ever see those cool effects with multiple arrows around the note combining into one? Well with this function that's possible!

```js
function Duplicate(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
      for (let i = 1; i < x; i++) { // This will make x amount of blocks around your targeted blocks
        let dupe = JSON.parse(JSON.stringify(note));
          dupe._customData.fake = true;
          // Put customData in here, sample one above
          dupe._customData._animation = {}
          // Put animation in here
          _notes.push(dupe);
      }
  })
}
```

Not going to tell you what to do here though, noodle was made to be explored and experimented with, not to follow directions. 

**Have fun noodle mapping!**
