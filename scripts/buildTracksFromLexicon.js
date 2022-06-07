#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");
let alltracks = [];
let total = 0;

function buildTracksFromLexicon({ tracks = [], offset = 0 }) {
	alltracks = [...alltracks, ...tracks];
	const config = {
		method: "get",
		headers: {
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			limit: 1000,
			offset,
			source: "non-archived"
		})
	};
	const nextOffset = offset + 1000;
	(async () => {
		const lexicon = await axios.get("http://localhost:48624/v1/tracks", config).then((response) => response.data);
		total = lexicon.data.total;
		const tracks = lexicon.data.tracks;
		if (total > alltracks.length) {
			fs.writeFileSync(`./.data/tracks${offset}.json`, JSON.stringify({ tracks }));
			buildTracksFromLexicon({ tracks, offset: nextOffset });
		}
	})();
}

try {
	(async () => {
		let alltracks = [];
		await buildTracksFromLexicon({ tracks: [], offset: 0 });
		fs.readdir("./.data", (err, files) => {
			files.forEach((file) => {
				const f = require("../.data/" + file);
				alltracks = [...alltracks, ...f.tracks];
			});
			fs.writeFileSync("./.data/alltracks.json", JSON.stringify({ tracks: alltracks }));
		});
	})();
} catch (err) {
	console.error(err);
}
