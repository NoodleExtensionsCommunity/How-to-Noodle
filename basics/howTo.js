// If you are reading through this, it means that the wiki for Noodle Extensions has probably confused you. No worries happens to everyone. 

// Let's start with explaining what AnimateTrack even is

// AnimateTrack basically tells the track (It can contain walls, bombs, notes and even environment structures), hey could you do this. The track does the effect, you can imagine it like it's one big game object containing smaller objects.

// Let's look at an example AnimateTrack

_customEvents.push({
    _type: "AnimateTrack",
    _time: 20,
    _data: {
        _track: "demoTrack",
        _duration: 10,
        _dissolve: [[1, 0], [0, 1]]
    }
})

// Ok let's explain each component of it
// The first part, so _customEvents.push({}) is used by the script to say you want this text written under _customEvents
// _type tells what customEvent this is, we defined it as AnimateTrack
// _time is what tells noodle when the event will happen (It's taken in beats)
// _data holds all of our precious stuff
// _track tells noodle which track you want it to affect, so every game object that will be defined under "demoTrack" will be affected by this
// _duration tells noodle how long the event will be happening for (also in beats)
// and for the last part, you can put any event you want in here. I chose _dissolve.


// Now to explain what the whole thing does
// This AnimateTrack will happen on the 20th beat. It will affect the track named "demoTrack". The length of the effect will be 10 beats. And the effect will be a dissolve effect which will start completely visible and progress to fully dissolved in that alloted time.

// If you still have more question you can dm me on discord StormPacer#2871
// Can't wait to see more talented noodle mappers :)