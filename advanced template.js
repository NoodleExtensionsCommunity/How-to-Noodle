"use strict";

const fs = require("fs");

const INPUT = "YOUR ORIGINAL DIFFICULTY (eg. HardStandard.dat)"
const OUTPUT = "WHERE NOODLE WILL BE WRITTEN TO (eg. ExpertStandard.dat)"

let difficulty = JSON.parse(fs.readFileSync(INPUT));

difficulty._customData = { _environment: [], _customEvents: [] };

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _environment = _customData._environment;
const _customEvents = _customData._customEvents;

_obstacles.forEach(wall => {
	if (!wall._customData) {
		wall._customData = {}
	}
})

_notes.forEach(note => {
	if (!note._customData) {
		note._customData = {}
	}
})

function Random(min, max) {
	max++;
	return Math.random() * (max - min) + min;
}

let filterednotes
let filteredwalls

function GiveNotesTrack(track, t1, t2) {
	filterednotes = _notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (!note._customData) note._customData = {};
		note._customData._track = track;
	})
}

function GiveWallsTrack(track, t1, t2) {
	filteredwalls = _obstacles.filter(n => n._time >= t1 && n._time <= t2)
	filteredwalls.forEach(wall => {
		if (!wall._customData) wall._customData = {};
		wall._customData._track = track;
	})
}

function Offset(t1, t2, Offset) {
	filterednotes = _notes.filter(n => n._time >= t1 && n.time <= t2)
	filterednotes.forEach(note => {
		if (!note._customData) note._customData = {};
		note._customData._noteJumpStartBeatOffset = Offset
	})
}

// Use: Offset(5, 10, 5)
// Gives the offset you define to notes between 2 beats (first two values)

function GoIn(t1, t2, x, y, z, EndTime) {
	filterednotes = _notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (!note._customData) note._customData = {};
		note._customData._animation = {};
		note._customData._animation._position = [[x, y, z, 0], [0, 0, 0, EndTime]];
	})
}

// Use: (5, 10, 0, 10, 0, 0.3)
// Makes the notes between 2 beats (first two values) come in from a certain x, y, z position. 

function Beat(t1, t2, Track, Interval, Scale) {
	for (let i = t1; i <= t2; i += Interval) {
		if (Interval > 1) {
			_customEvents.push({
				_time: i,
				_type: "AnimateTrack",
				_data: {
					_track: Track,
					_duration: 1,
					_scale: [[1, 1, 1, 0], [Scale, Scale, Scale, 0.2, "easeInOutCubic"], [1, 1, 1, 0.7]]
				}
			})
		}
		else {
			_customEvents.push({
				_time: i,
				_type: "AnimateTrack",
				_data: {
					_track: Track,
					_duration: 0.5,
					_scale: [[1, 1, 1, 0], [Scale, Scale, Scale, 0.2, "easeInOutCubic"], [1, 1, 1, 0.7]]
				}
			})
		}
	}
}

// Use: (5, 15, "beatTrack", 1, 1.5)
// Animates the defined track with _scale with a certain interlval. The first two value are the beats

function Chaos(t1, t2, Offset, EndTime, Easing) {
	filterednotes = _notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (!note._customData) note._customData = {};
		note._customData._noteJumpStartBeatOffset = Offset;
		note._customData._animation = {};
		if (!Easing) {
		note._customData._animation._position = [[Random(-30, 30), Random(-10, 30), Random(0, 30), 0], [0, 0, 0, EndTime]];
		note._customData._animation._localRotation = [[Random(0, 360), Random(0, 360), Random(0, 360), 0], [0, 0, 0, EndTime]];
		note._customData._animation._dissolve = [[0, 0.05], [1, 0.1]];
		note._customData._animation._dissolveArrow = [[0, 0.05], [1, 0.1]];
		}
		else {
		note._customData._animation._position = [[Random(-30, 30), Random(-10, 30), Random(0, 30), 0], [0, 0, 0, EndTime, Easing]];
		note._customData._animation._localRotation = [[Random(0, 360), Random(0, 360), Random(0, 360), 0], [0, 0, 0, EndTime, Easing]];
		note._customData._animation._dissolve = [[0, 0.05], [1, 0.1]];
		note._customData._animation._dissolveArrow = [[0, 0.05], [1, 0.1]];
		}
	})
}

// Use: (5, 10, 5, 0.4, "easeInOutCubic")
// Spawns the notes in random places and puts them on their original position at the defined time, easing is optional.

const precision = 4

// WRITE YOUR SCRIPT IN HERE ˇ

// WRITE YOUR SCRIPT IN HERE ^

var jsonP = Math.pow(10, precision)
var sortP = Math.pow(10, 2)
function hahaBall(obj) {
	if (obj)
		for (const key in obj) {
			if (obj[key] == null) {
				delete obj[key]
			} else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
				hahaBall(obj[key])
			} else if (typeof obj[key] == 'number') {
				obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP)
			}
		}
}
hahaBall(difficulty)

difficulty._notes.sort(
	(a, b) =>
		parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
)
difficulty._obstacles.sort((a, b) => a._time - b._time)
difficulty._events.sort((a, b) => a._time - b._time)

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 0));
