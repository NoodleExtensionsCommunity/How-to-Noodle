"use strict";
const fs = require('fs');

const INPUT = "ExpertStandard.dat" //INPUT DIFFICULTY
const OUTPUT = "ExpertPlusStandard.dat" //INPUT DIFFICULTY

let difficulty = JSON.parse(fs.readFileSync(INPUT));

difficulty.customData = { environment: [], customEvents: [], fakeColorNotes: [], fakeBombNotes: [], fakeObstacles: [], fakeBurstSliders: [] };

const customData = difficulty.customData;
const walls = difficulty.obstacles;
const notes = difficulty.colorNotes;
const bombs = difficulty.bombNotes;
const arcs = difficulty.sliders;
const chains = difficulty.burstSliders;
const beatMapEvent = difficulty.basicBeatmapEvents;
const environment = customData.environment;
const customEvents = customData.customEvents;

let filterednotes;
let filteredwalls;
let filterarcs;

walls.forEach(wall => {
	if (!wall.customData) {
		wall.customData = {}
	}
})

notes.forEach(note => {
	if (!note.customData) {
		note.customData = {}
	}
})

bombs.forEach(bomb => {
	if(!bomb.customData) {
		bomb.customData - {}
	}
})

function randint(min, max) {
	max++;
	return Math.random() * (max - min) + min;
}

function GiveNotesTrack(track, t1, t2) {
	filterednotes = notes.filter(n => n.b >= t1 && n.b <= t2)
	filterednotes.forEach(note => {
		if (!note.customData.track) note.customData.track = track;
		else if (Array.isArray(note.customData.track)) note.customData.track.push(track)
		else if (note.customData.track != track) note.customData.track = [note.customData.track, track]
	})
}

function GiveArcsTrack(track, t1, t2){
	filterarcs = arcs.filter(n => n.b >= t1 && n.b <= t2)
	filterarcs.forEach(arc => {
		if (!arc.customData.track) arc.customData.track = track;
		else if (Array.isArray(arc.customData.track)) arc.customData.track.push(track)
		else if (arc.customData.track != track) arc.customData.track = [arc.customData.track, track]
	})
}

function GiveChainsTrack(track, t1, t2){
	filterarcs = chains.filter(n => n.b >= t1 && n.b <= t2)
	filterarcs.forEach(chain => {
		if (!chain.customData.track) chain.customData.track = track;
		else if (Array.isArray(chain.customData.track)) chain.customData.track.push(track)
		else if (chain.customData.track != track) chain.customData.track = [chain.customData.track, track]
	})
}

function GiveWallsTrack(track, t1, t2) {
	filteredwalls = walls.filter(n => n.b >= t1 && n.b <= t2)
	filteredwalls.forEach(wall => {
		if (!wall.customData.track) wall.customData.track = track;
		else if (Array.isArray(wall.customData.track)) wall.customData.track.push(track)
		else if (wall.customData.track != track) wall.customData.track = [wall.customData.track, track]
	})
}

function GiveNoteTypesTrack(Type0Track, Type1Track, t1, t2) {
	filterednotes = notes.filter(n => n.b >= t1 && n.b <= t2)
	filterednotes.forEach(note => {
		if (note.type == 0) {
			if (!note.customData.track) note.customData.track = Type0Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Type0Track)
			else if (note.customData.track != Type0Track) note.customData.track = [note.customData.track, Type0Track]
		}
		if (note.type == 1) {
			if (!note.customData.track) note.customData.track = Type1Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Type1Track)
			else if (note.customData.track != Type0Track) note.customData.track = [note.customData.track, Type1Track]
		}
	})
}

function GiveNoteLanesTrack(Lane1Track, Lane2Track, Lane3Track, Lane4Track, t1, t2) {
	filterednotes = notes.filter(n => n.b >= t1 && n.b <= t2)
	filterednotes.forEach(note => {
		if (note.lineLayer == 0) {
			if (!note.customData.track) note.customData.track = Lane1Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Lane1Track)
			else if (note.customData.track != Lane1Track) note.customData.track = [note.customData.track, Lane1Track]
		}
		if (note.lineLayer == 1) {
			if (!note.customData.track) note.customData.track = Lane2Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Lane2Track)
			else if (note.customData.track != Lane2Track) note.customData.track = [note.customData.track, Lane2Track]
		}
		if (note.lineLayer == 2) {
			if (!note.customData.track) note.customData.track = Lane3Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Lane3Track)
			else if (note.customData.track != Lane3Track) note.customData.track = [note.customData.track, Lane3Track]
		}
		if (note.lineLayer == 3) {
			if (!note.customData.track) note.customData.track = Lane4Track
			if (Array.isArray(note.customData.track)) note.customData.track.push(Lane4Track)
			else if (note.customData.track != Lane4Track) note.customData.track = [note.customData.track, Lane4Track]
		}
	})
}

const precision = 4

//Variables (DON'T WORRY ABOUT THESE!!!!!!!)
//!!! THIS IS BASICALLY HECKLIB ON JAVASCRIPT, I DID NOT MAKE THIS!!!


		







//Example Object Creations

//NOTE
// notes.push({
// 	"b": 5, //Time
// 	"x": 0, //LineIndex
// 	"y": 0, //LineLayer
// 	"a": 2, //AngleOffset
// 	"c": 2, //Color of note
// 	"d": 0 //CutDirection
// })

//WALL
// walls.push(
// 	{
// 		"b": 1, //Time
// 		"x": 1, //X Position
// 		"y": 1, //Y Position
// 		"d": 5, //Duration of the wall
// 		"w": 1, //Width
// 		"h": 3 //Height
// 	}
// )

//BOMB
// bombs.push(
// 	{
// 		"b": 1, //Time
// 		"x": 1, //X Position
// 		"y": 1 //Y Position

// 	}
// )

//CHAIN
// new chains(
// 	{
// 		"b": 10.0,  // Beat
// 		"x": 1,     // Head x
// 		"y": 0,     // Head y
// 		"c": 0,     // Color
// 		"d": 1,     // Head direction
// 		"tb": 15.0, // Tail Beat
// 		"tx": 2,    // Tail x
// 		"ty": 2,    // Tail y
// 		"sc": 3,    // Segment count
// 		"s": 0.5    // Squish factor
// 	  }
// )

//ARCS
// arcs.push(
// 	{
// 		"b": 10.0,  // Head Beat
// 		"c": 1,     // Color
// 		"x": 1,     // Head x
// 		"y": 0,     // Head y
// 		"d": 0,     // Head direction
// 		"mu": 4,  // Head multiplier
// 		"tb": 20, // Tail Beat
// 		"tx": 1,    // Tail x
// 		"ty": 0,    // Tail y
// 		"tc": 1,    // Tail direction
// 		"tmu": 1.0, // Tail Multiplier
// 		"m": 1,     // Mid-anchor mode


// 	}
// )

//BEATMAPEVENT(LIGHTS N SHIT)
// beatMapEvent.push(
// 	{
// 		"b": 1.0, //Time
// 		"et": 0, //Type
// 		"i": 5, //Value
// 		"f": 1.0 //Float Value, idk wtf this does
// 	}
// )




//NOTES
//Arc tracks are useless/Idk how to get them to work
//Chains track are also useless? idk that shit dont work



// WRITE YOUR SCRIPT IN HERE ˇ

//!! REMEMBER, UNDERSCORES DON'T EXIST IN V3!!


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

notes.sort(
	(a, b) =>
		parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a.lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.lineIndex + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a.lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.lineLayer + Number.EPSILON) * sortP) / sortP)
)
difficulty.obstacles.sort((a, b) => a.b - b.b)
difficulty.basicBeatmapEvents.sort((a, b) => a.b - b.b)

fs.writeFileSync(OUTPUT, JSON.stringify(difficulty, null, 4));

const data = JSON.parse(fs.readFileSync(OUTPUT))

// console.log("\n--------------- NOODLE/CHROMA EVENTS STATS ---------------\n\n", data.customData.environment.length, "Environment pieces pushed\n", data.customData.customEvents.length, "Custom events pushed\n\n--------------- NORMAL MAP STATS ---------------\n\n", data.colorNotes.length, "Notes\n", data.obstacles.length, "Walls\n", data.events.length, "Events")
// console.log("\x1b[1m\x1b[32m", "\nAll pushes ran successfully!\n")
