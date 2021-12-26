# Getting started
If you haven't already, It's highly recommended to grab the template from this repository as everything shown here will be made using the template, so without further of ado, let's start learning!

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

If you still have more question you can dm me on discord StormPacer#2871

Can't wait to see more talented noodle mappers :)
#
# AssignPlayerToTrack
This one is pretty straightforward. AssignPlayerToTrack tells the mod you want the player on a certain track.

Let's look at an example of it.

```js
_customEvents.push({
    _time: 35,
    _type: "AssignPlayerToTrack",
    _data: {
        _track: "playerDemo"
    }
})
```

Let's explain all the parts again.
#
We have already learnt what most of the stuff does so I'll just explain why there is so little data.

Basically we are just saying on which track the player will be put on, we don't say which animation the player will do. This just tells the mod that on beat 35 it should put the player on the track called "playerDemo". 
#
We can animate the track however we want but only certain effects will affect the player. Those being _position, _localRotation and _rotation.
#
# AssignPathAnimation
AssignPathAnimation tells the mod you want all the objects on this track to do a certain animation over it's lifetime. Time in here is the objects lifetime, 0 representing when it spawns, 0.5 representing when it's by the player and 1 when it's fully destroyed.

Let's look at an example of it.

```js
_customEvents.push({
    _time: 15,
    _type: "AssignPathAnimation",
    _dat: {
        _track: "pathDemo",
        _dissolve: [[0, 0], [1, 0.3]]
    }
})
```

I pretty much explained the gist of what this is, I'll just explain the effect.
#
What is happening in here is that every note that has the "pathDemo" track and is after the 15th beat, will start dissolved and undissolve until it's a bit before the player. We can tell that because time 0 is when the note spawns (the note will be fully invisible EXCEPT THE ARROW!) and it's fully visible by time 0.3, which is a bit before the player.
