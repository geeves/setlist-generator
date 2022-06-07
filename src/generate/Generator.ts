import camelot from "../asset/keymap.json";
import lexicon from "../asset/data/alltracks.json";

import SetList from "./SetList";
import Track from "./Track";
import timeFormat from "../common/timeFormat";
import LexiconTrack from "./LexiconTrack";
import {
	allkeys,
	bpmEntropy,
	enableMaxTrackTime,
	enableSingleKey,
	genres,
	maxBpm,
	maxTrackTime,
	minBpm,
	selectedKeys,
	setentropy,
	totalDuration
} from "../common/Constants";
import shuffle from "../common/Shuffle";
import BuildOptions from "./BuildOptions";

let currentDuration: number = 0;
const startingKey = simplyRandom(shuffle(allkeys));
const { fifths } = camelot;
const keyMap: Map<string, string> = new Map();
for (let c = 0; c < fifths.length; c++) {
	let fifth = fifths[c];
	// @ts-ignore
	keyMap.set(camelot[fifth].key, fifth);
}

function sameKey() {
	return 0 === (Math.floor(Math.random() * 10) + 1) % 4;
}

function simplyRandom(items: any[] = []) {
	return items[Math.floor(Math.random() * items.length)];
}

// @ts-ignore
function getKeysFromEntropy(entropyLevel, camelotFifth) {
	switch (entropyLevel) {
		case 1:
			// @ts-ignore
			return camelot[keyMap.get(startingKey)].main;
		case 2:
			return [...camelotFifth.main, ...camelotFifth.semitone];
		case 3:
			return [...camelotFifth.main, ...camelotFifth.semitone, ...camelotFifth.doublesemitone];
	}
}

const filterLexiconTracks = (lexiconTracks: LexiconTrack[]): LexiconTrack[] => {
	return lexiconTracks
		.filter((t) => maxBpm >= t.bpm && minBpm <= t.bpm)
		.filter((t) => {
			if (enableMaxTrackTime) {
				return maxTrackTime >= t.duration;
			}
			return t;
		})
		.filter((t) => {
			if (enableSingleKey) {
				return startingKey === t.key;
			}
			return t;
		})
		.filter((t) => {
			if (0 < selectedKeys.length) {
				return selectedKeys.includes(t.key);
			}
			return t;
		})
		.filter((t) => {
			if (0 < genres.length) {
				return genres.includes(t.genre.toLowerCase());
			}
			return t;
		});
};

function entropyMain(filtered: LexiconTrack[]) {
	const cwValue = keyMap.get(startingKey);
	// @ts-ignore
	const cw = camelot[cwValue];
	const options: BuildOptions = {
		trackList: [],
		filtered,
		currDuration: 0,
		currKey: startingKey,
		// @ts-ignore
		prevTrack: null,
		keys: getKeysFromEntropy(setentropy, cw),
		init: true,
		ids: [],
		titles: [],
		entropyLevel: setentropy
	};

	return buildTrackList(options);
}

function entropyZero(filtered: LexiconTrack[]) {
	return shuffle(filtered).filter((t) => {
		if (totalDuration > currentDuration) {
			currentDuration = currentDuration + t.duration;
			return t;
		}
	});
}

const createTrackList = (filtered: LexiconTrack[]): LexiconTrack[] => {
	switch (setentropy) {
		case 0:
		default:
			return entropyZero(filtered);
		case 1:
		case 2:
		case 3:
			return entropyMain(filtered);
	}
};

const buildTrackList = (buildOptions: BuildOptions): LexiconTrack[] => {
	let {
		trackList,
		filtered,
		currDuration,
		currKey,
		prevTrack,
		keys,
		entropyLevel,
		init = true,
		ids = [],
		titles = []
	} = buildOptions;

	const same = init ? currKey : sameKey();
	let newFifth = same ? keyMap.get(currKey) : simplyRandom(keys.filter((k) => currKey !== k));
	// @ts-ignore
	const camelotFifth = camelot[newFifth];
	const newKey = camelotFifth.key;
	const temp: LexiconTrack[] = filtered
		.filter((t) => {
			return newKey === t.key;
		})
		.filter((t) => !ids.includes(t.id))
		.filter((t) => !titles.includes(t.title))
		.filter((t) => {
			if (prevTrack.hasOwnProperty("bpm")) {
				const p = prevTrack.bpm + bpmEntropy;
				const m = prevTrack.bpm - bpmEntropy;
				return p >= t.bpm && m <= t.bpm;
			}
			return t;
		});

	const nextTrack: LexiconTrack = simplyRandom(temp);
	if (totalDuration > currDuration) {
		trackList.push(nextTrack);
		ids.push(nextTrack.id);
		titles.push(nextTrack.title);
		const options: BuildOptions = {
			trackList,
			filtered,
			currDuration: currDuration + nextTrack.duration,
			currKey: nextTrack.key,
			prevTrack: nextTrack,
			keys: getKeysFromEntropy(entropyLevel, camelotFifth),
			entropyLevel,
			init: false,
			ids,
			titles
		};
		return buildTrackList(options);
	}
	return trackList;
};

const setlistGenerator = (): SetList => {
	const tracks: LexiconTrack[] = lexicon.tracks;
	let filtered: LexiconTrack[] = filterLexiconTracks(tracks);

	const lexiconTrackList = createTrackList(filtered);

	const trackListDuration = lexiconTrackList.reduce((a, t) => {
		return a + t.duration;
	}, 0);

	const trackList: Track[] = lexiconTrackList.map((tl) => {
		return {
			id: tl.id,
			artist: tl.artist,
			title: tl.title,
			remixer: tl.remixer,
			label: tl.label,
			key: tl.key,
			bpm: tl.bpm,
			duration: timeFormat(tl.duration)
		};
	});

	return {
		totalDuration: timeFormat(trackListDuration),
		trackList
	};
};

export default setlistGenerator;
