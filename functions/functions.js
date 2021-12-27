function Rotate(Start, End) {
    filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
    filterednotes.forEach(note => {
      note._customData._animation = {}
      note._customData._animation._localRotation = [[Random(0, 180), Random(0, 180), Random(0, 180), 0], [0, 0, 0, 0.5, "easeInOutExpo"]];
    })
}

function leftIn(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._position = [[-50, 0, 0, 0], [0, 0, 0, 0.3, "easeInOutExpo"]];
  })
}

function Dissolve(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._dissolve = [[0, 0], [1, 0.3]];
  })
}

function Grow(Start, End) {
  filterednotes = _notes.filter(n => n._time >= Start && n._time < End);
  filterednotes.forEach(note => {
    note._customData._animation = {}
    note._customData._animation._scale = [[0, 0, 0, 0], [1, 1, 1, 0.3]];
  })
}

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
