interface RekordBox {
	trackId: number;
	kind: string;
	discNumber: string;
}

interface LexiconData {
	rekordbox: RekordBox;
}

interface LexiconTrack {
	id: number;
	type: string;
	location: string;
	title: string;
	artist: string;
	albumTitle: string;
	label: string;
	remixer: string;
	mix: string;
	composer: string;
	producer: string;
	grouping: string;
	lyricist: string;
	comment: string;
	key: string;
	genre: string;
	bpm: number;
	rating: number;
	color: string;
	year: number;
	duration: number;
	bitrate: number;
	playcount: number;
	lastPlayed: string;
	dateAdded: string;
	dateModified: string;
	sizeBytes: number;
	sampleRate: number;
	trackNumber: number;
	energy: number;
	danceability: number;
	popularity: number;
	happiness: number;
	extra1: string;
	extra2: string;
	importSource: string;
	locationUnique: string;
	incoming: number;
	archived: number;
	archivedSince: string;
	beatshiftCase: string;
	fingerprint: string;
	streamingService: string;
	streamingId: number;
	data: RekordBox;
}

export default LexiconTrack;
