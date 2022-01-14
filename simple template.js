"use strict";

const fs = require('fs');

const INPUT = "YOUR ORIGINAL DIFFICULTY (eg. HardStandard.dat)"
const OUTPUT = "WHERE NOODLE WILL BE WRITTEN TO (eg. ExpertStandard.dat)"

let difficulty = JSON.parse(fs.readFileSync(INPUT));

difficulty._customData = { _environment: [], _customEvents: [] };

const _customData = difficulty._customData;
const _obstacles = difficulty._obstacles;
const _notes = difficulty._notes;
const _environment = _customData._environment;
const _customEvents = _customData._customEvents;

let filterednotes
let filteredwalls

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

const precision = 4

// WRITE YOUR SCRIPT IN HERE ˇ

// WRITE YOUR SCRIPT IN HERE ^

const jsonP = Math.pow(10, precision)
const sortP = Math.pow(10, 2)
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
