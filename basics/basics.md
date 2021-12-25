# Getting started
If you haven't already, It's highly recommended to grab the template from this repository as everything shown here will be made using the template, so without further of ado, let's starting learning!

# AnimateTrack
Let's start with explaining what AnimateTrack even is.

AnimateTrack basically tells the track (which can contain walls, bombs, notes and even environment structures), hey could you do this. The track later does the effect. You can imagine it like it's one big game object containing smaller objects.

Let's look at an example of it:

```js
_customEvents.push({
    _time: 20,
    _type: "AnimateTrack",
    _data: {
        _track: "demoTrack",
        _duration: 10,
        _dissolve: [[1, 0], [0, 1]]
    }
})
```
I'll try to explain this part by part as best as I can.
#
`_customEvents.push( {  } )` is used by the script to say you want this text written under _customEvents in the main difficulty file (using `fs` for node.js).

`_type` tells it what customEvent this is, we defined it as AnimateTrack.

`_time` is what tells it when the event will happen (in beats!)

`_data` holds all of our precious stuff.

`_track` tells it which track you want it to affect, so every game object that will be defined under "demoTrack" will be affected by this.

`_duration` tells it how long the event will be happening for (also in beats!)

And for the last part, you can put any event you want in here. I chose `_dissolve`.
#
Now to explain what the whole thing actually does:

This AnimateTrack will happen on the 20th beat. It will affect the track named "demoTrack". The length of the effect will be 10 beats. And the effect will be a dissolve effect which will start completely visible and progress to fully dissolved in that alloted time.
