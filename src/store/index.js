import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./reducers/index.js";

export const store = configureStore({
	reducer: {
		session: sessionReducer,
	},
});
