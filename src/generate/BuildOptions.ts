import LexiconTrack from "./LexiconTrack";

interface BuildOptions {
	trackList: LexiconTrack[];
	filtered: LexiconTrack[];
	currDuration: number;
	currKey: string;
	prevTrack: LexiconTrack;
	keys: string[];
	entropyLevel: number;
	init: boolean;
	ids: number[];
	titles: string[];
}

export default BuildOptions;
