import { configureStore } from "@reduxjs/toolkit";
import setlistReducer from "./reducers/SetlistReducer";

export const store = configureStore({
	reducer: {
		setlist: setlistReducer
	}
});

export default store;
