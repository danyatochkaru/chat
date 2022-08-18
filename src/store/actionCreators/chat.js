import { CHAT_ACTION_TYPES } from "../reducers/chat.js";
import api from "./api.js";

export const fetchChats = () => async (dispatch) => {
	try {
		dispatch({
			type: CHAT_ACTION_TYPES.FETCH,
		});
		const { data } = await api.get("/chats");

		dispatch({
			type: CHAT_ACTION_TYPES.FETCH_SUCCESS,
			payload: data,
		});
	} catch (error) {
		console.error(error);

		dispatch({
			type: CHAT_ACTION_TYPES.FETCH_ERROR,
			payload: "Error",
		});
	}
};

export const selectChat = (id) => async (dispatch) => {
	try {
		dispatch({
			type: CHAT_ACTION_TYPES.SET_SELECTED,
			payload: id,
		});
	} catch (error) {
		console.error(error);

		dispatch({
			type: CHAT_ACTION_TYPES.FETCH_ERROR,
			payload: "Error",
		});
	}
};
