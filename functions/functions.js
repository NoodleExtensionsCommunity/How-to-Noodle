// First off this is the function I use for random numbers

function Random(min, max) {
  max++;
  return Math.random() * (max - min) + min;
}

// This might be a good time to explain time. Time is basically the lifetime of the note and is always the last value in effects. It can range from 0-1. 0 meaning the time the note spawns, 0.5 meaning the time the note reaches the player and lastly 1 meaning the time that the note is fully despawned.
// Let's say we want to spawn the note with a random rotation. We also want the note to rotate back to it's original position by the time it reaches the player.

function Rotate(Start, End) {
    filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
    filterednotes.forEach(note => {
      note._customData._animation = {}
      note._customData._animation._localRotation = [[Random(0, 180), Random(0, 180), Random(0, 180), 0], [0, 0, 0, 0.5, "easeInOutExpo"]];
    })
}

// Let's move the notes from the left at the coordinate -50 to their original position BEFORE they come to the player so they have time to react.

function leftIn(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._position = [[-50, 0, 0, 0], [0, 0, 0, 0.3, "easeInOutExpo"]];
  })
}

// SIMPLE SPAWN EFFECTS
// First function I want to show off is a simple dissolve effect, this will spawn a dissolved note (ARROW IS STILL VISIBLE, YOU NEED TO USE _dissolveArrow to disolve the arrow too) and it will become fully undissolved by the end of the function

function Dissolve(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._dissolve = [[0, 0], [1, 0.3]];
  })
}

// Second function is just a normal grow effect using _scale

function Grow(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._scale = [[0, 0, 0, 0], [1, 1, 1, 0.3]];
  })
}

// Now we can do some fun variation by combining different effects into functions

// In this function we will be offsetting the note spawn so they stay on screen longer

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

// Now this is an interesting function duplicating the originally selected blocks x number of times

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

// Now it's your turn. Hope you learnt something about custom functions from this. Have fun with making awesome functions.