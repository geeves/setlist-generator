import { createSlice } from "@reduxjs/toolkit";
import SetlistGenerator from "../generate/SetlistGenerator";
import lexicon from "../asset/data/alltracks.json";
import SetList from "../generate/SetList";

const setlistReducer = createSlice({
	name: "setlist",
	// @ts-ignore
	initialState: {
		setList: {
			trackList: [],
			totalDuration: "0:00",
			setEntropy: 0
		}
	},
	reducers: {
		generate: (state) => {
			// @ts-ignore
			const sl: SetList = SetlistGenerator(lexicon.tracks);
			// @ts-ignore
			state.setList = sl;
		}
	}
});

export const { generate } = setlistReducer.actions;
export default setlistReducer.reducer;
