// ANIMATE TRACK EXAMPLE

_customEvents.push({
    _type: "AnimateTrack",
    _time: 20,
    _data: {
        _track: "demoTrack",
        _duration: 10,
        _dissolve: [[1, 0], [0, 1]]
    }
})

// ASSIGN PLAYER TO TRACK EXAMPLE

_customEvents.push({
    _time: 35,
    _type: "AssignPlayerToTrack",
    _data: {
        _track: "playerDemo"
    }
})

// ASSIGN PATH ANIMATION EXAMPLE

_customEvents.push({
    _time: 15,
    _type: "AssignPathAnimation",
    _dat: {
        _track: "pathDemo",
        _dissolve: [[0, 0], [1, 0.3]]
    }
})
