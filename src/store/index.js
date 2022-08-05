import { configureStore } from "@reduxjs/toolkit";
import {
	sessionReducer,
	chatReducer,
	messageReducer,
} from "./reducers/index.js";

export const store = configureStore({
	reducer: {
		session: sessionReducer,
		chat: chatReducer,
		message: messageReducer,
	},
});
