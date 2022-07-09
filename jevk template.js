
"use strict";

const fs = require("fs");

const INPUT = "ExpertPlusStandard.dat";
const OUTPUT = "ExpertPlusLawless.dat";

const NJS = 16; //NJS HERE
const OFFSET = 0; //OFFSET HERE

let difficulty = JSON.parse(fs.readFileSync(INPUT));


difficulty._customData = {
    _pointDefinitions: [],
    _customEvents: [],
    _environment: []
};

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _customEvents = _customData._customEvents;
const _pointDefinitions = _customData._pointDefinitions;
const _environment = _customData._environment;

let filterednotes;

_obstacles.forEach(wall => {
    if (!wall._customData) {
        wall._customData = {};
    }
    let data = wall._customData;
    data._noteJumpMovementSpeed = NJS;
    data._noteJumpStartBeatOffset = OFFSET;
});

_notes.forEach(note => {
    if (!note._customData) {
        note._customData = {};
    }
    let data = note._customData;
    data._noteJumpMovementSpeed = NJS;
    data._noteJumpStartBeatOffset = OFFSET;
});

class Wall {
    constructor(time, duration, data) {
        this._time = time;
        this._type = 1;
        this._width = 1;
        this._lineIndex = 0;
        this._duration = duration;
        this._customData = data;
        _obstacles.push(this);
    }
}

class Note {
    constructor(time, lineIndex, lineLayer, type, direction, data) {
        this._time = time;
        this._lineIndex = lineIndex;
        this._lineLayer = lineLayer;
        this._type = type;
        this._cutDirection = direction;
        this._customData = data;
        _notes.push(this);
    }
}

class AnimateTrack {
    constructor(time, data) {
        this._time = time;
        this._type = "AnimateTrack";
        this._data = data;
        _customEvents.push(this);
    }
}

class AssignPathAnimation {
    constructor(time, data) {
        this._time = time;
        this._type = "AssignPathAnimation";
        this._data = data;
        _customEvents.push(this);
    }
}

class AssignPlayerToTrack {
    constructor(time, track) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {
            _track: track
        }
        _customEvents.push(this);
    }
}

class AssignTrackParent {
    constructor(time, childrenTracks, parentTrack) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {
            _childrenTracks: childrenTracks,
            _parentTrack: parentTrack
        }
        _customEvents.push(this);
    }
}

class AssignFogTrack {
    constructor(time, track) {
        this._time = time;
        this._type = "AssignFogTrack",
        this._data = {
            _track: track
        }
        _customEvents.push(this);
    }
}

class PointDefinition {
    constructor(name, points) {
        this._name = name;
        this._points = points;
        _pointDefinitions.push(this);
    }
}

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    return [r, g, b];
}

function filterNotes(start, end, type) {
    filterednotes = _notes.filter(n => n._time >= start && n._time <= end);
    if (typeof type !== 'undefined' && type !== null)
        filterednotes = filterednotes.filter(n1 => n1._type == type);
    return filterednotes;
}

function filterDoubles(start, end) {
    const filteredStacks = [];
    let prevTime = -1;
    filterednotes = _notes.filter(n => n._time >= start && n._time <= end);
    filterednotes.forEach(note => {
        if (note._time == prevTime) {
            filteredStacks.push(note, filterednotes[filterednotes.indexOf(note) - 1]);
        }
        prevTime = note._time;
    });
    return filteredStacks;
}

function filterWalls(start, end) {
    let walls = _obstacles.filter(w => w._time >= start && w._time <= end);
    return walls;
}

function noteTrack(track, p1, p2, potentialOffset) {
    filterNotes(p1, p2).forEach(object => {
        let d = object._customData;
        if (!d._track) 
            d._track = track;
         else if (Array.isArray(d._track)) {
            d._track.push(track)
        } else {
            d._track = [d._track, track];
        }
        if (typeof potentialOffset !== "undefined") {
            d._noteJumpStartBeatOffset = potentialOffset;
        }
    });
    return filterednotes;
}

function wallTrack(track, p1, p2, potentialOffset) {
    filterWalls(p1, p2).forEach(object => {
        let d = object._customData;
        if (!d._track) 
            d._track = track;
         else if (Array.isArray(d._track)) {
            d._track.push(track)
        } else {
            d._track = [d._track, track];
        }
        if (typeof potentialOffset !== "undefined") {
            d._noteJumpStartBeatOffset = potentialOffset;
        }
    });
    return filterednotes;
}

function noteTrackRB(trackR, trackB, p1, p2, potentialOffset) {
    filterNotes(p1, p2).forEach(object => {
        let d = object._customData;
        if (typeof potentialOffset !== "undefined") {
            d._noteJumpStartBeatOffset = potentialOffset;
        }
        if (object._type == 0) {
            if (!d._track) 
                d._track = trackR;
             else if (Array.isArray(d._track)) {
                d._track.push(trackR)
            } else {
                d._track = [d._track, trackR];
            }
        }
        if (object._type == 1) {
            if (!d._track) 
                d._track = trackB;
             else if (Array.isArray(d._track)) {
                d._track.push(trackB)
            } else {
                d._track = [d._track, trackB];
            }
        }
    });
    return filterednotes;
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

// #region                       -  -  -  -  -  -  -  -  -  -  -  -  -  DO YOUR DIRTY WORK HERE  -  -  -  -  -  -  -  -  -  -  -  -  -



















// #endregion                     -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  STOP  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


// #region write file
const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size

const jsonP = Math.pow(10, precision);
const sortP = Math.pow(10, 2);
function deeperDaddy(obj) {
    if (obj) 
        for (const key in obj) {
            if (obj[key] == null) {
                delete obj[key];
            } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] == "number") {
                obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP);
            }
        }
    
}
deeperDaddy(difficulty);

difficulty._notes.sort((a, b) => parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) || parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
difficulty._obstacles.sort((a, b) => a._time - b._time);
difficulty._events.sort((a, b) => a._time - b._time);

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));

// #endregion

const data = JSON.parse(fs.readFileSync(OUTPUT))

console.log("\n--------------- NOODLE/CHROMA EVENTS STATS ---------------\n\n", data._customData._environment.length, "Environment pieces pushed\n", data._customData._customEvents.length, "Custom events pushed\n\n--------------- NORMAL MAP STATS ---------------\n\n", data._notes.length, "Notes\n", data._obstacles.length, "Walls\n", data._events.length, "Events")
console.log("\x1b[1m\x1b[32m", "\nAll pushes ran successfully!\n")