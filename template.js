"use strict";
const fs = require('fs');

const INPUT = "EasyLightshow.dat"
const OUTPUT = "NormalStandard.dat"

let difficulty = JSON.parse(fs.readFileSync(INPUT));

difficulty._customData = { _environment: [], _customEvents: [] };

const customData = difficulty._customData;
const walls = difficulty._obstacles;
const notes = difficulty._notes;
const environment = customData._environment;
const customEvents = customData._customEvents;

let filterednotes
let filteredwalls

walls.forEach(wall => {
	if (!wall._customData) {
		wall._customData = {}
	}
})

notes.forEach(note => {
	if (!note._customData) {
		note._customData = {}
	}
})

function Random(min, max) {
	max++;
	return Math.random() * (max - min) + min;
}

function GiveNotesTrack(track, t1, t2) {
	filterednotes = notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (!note._customData._track) note._customData._track = track;
		else if (Array.isArray(note._customData._track)) note._customData._track.push(track)
		else if (note._customData._track != track) note._customData._track = [note._customData._track, track]
	})
}

function GiveWallsTrack(track, t1, t2) {
	filteredwalls = walls.filter(n => n._time >= t1 && n._time <= t2)
	filteredwalls.forEach(wall => {
		if (!wall._customData._track) wall._customData._track = track;
		else if (Array.isArray(wall._customData._track)) wall._customData._track.push(track)
		else if (wall._customData._track != track) wall._customData._track = [wall._customData._track, track]
	})
}

function GiveNoteTypesTrack(Type0Track, Type1Track, t1, t2) {
	filterednotes = notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (note._type == 0) {
			if (!note.customData._track) note.customData._track = Type0Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Type0Track)
			else if (note.customData._track != Type0Track) note.customData._track = [note.customData._track, Type0Track]
		}
		if (note._type == 1) {
			if (!note.customData._track) note.customData._track = Type1Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Type1Track)
			else if (note.customData._track != Type0Track) note.customData._track = [note.customData._track, Type1Track]
		}
	})
}

function GiveNoteLanesTrack(Lane1Track, Lane2Track, Lane3Track, Lane4Track, t1, t2) {
	filterednotes = notes.filter(n => n._time >= t1 && n._time <= t2)
	filterednotes.forEach(note => {
		if (note._lineLayer == 0) {
			if (!note.customData._track) note.customData._track = Lane1Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Lane1Track)
			else if (note.customData._track != Lane1Track) note.customData._track = [note.customData._track, Lane1Track]
		}
		if (note._lineLayer == 1) {
			if (!note.customData._track) note.customData._track = Lane2Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Lane2Track)
			else if (note.customData._track != Lane2Track) note.customData._track = [note.customData._track, Lane2Track]
		}
		if (note._lineLayer == 2) {
			if (!note.customData._track) note.customData._track = Lane3Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Lane3Track)
			else if (note.customData._track != Lane3Track) note.customData._track = [note.customData._track, Lane3Track]
		}
		if (note._lineLayer == 3) {
			if (!note.customData._track) note.customData._track = Lane4Track
			if (Array.isArray(note.customData._track)) note.customData._track.push(Lane4Track)
			else if (note.customData._track != Lane4Track) note.customData._track = [note.customData._track, Lane4Track]
		}
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

const data = JSON.parse(fs.readFileSync(OUTPUT))

console.log("\n--------------- NOODLE/CHROMA EVENTS STATS ---------------\n\n", data._customData._environment.length, "Environment pieces pushed\n", data._customData._customEvents.length, "Custom events pushed\n\n--------------- NORMAL MAP STATS ---------------\n\n", data._notes.length, "Notes\n", data._obstacles.length, "Walls\n", data._events.length, "Events")
console.log("\x1b[1m\x1b[32m", "\nAll pushes ran successfully!\n")