import { MESSAGE_ACTION_TYPES } from "../reducers/message.js";
import api from "./api.js";

export const fetchMessagesByChatId = (id) => async (dispatch) => {
	try {
		if (id) {
			dispatch({
				type: MESSAGE_ACTION_TYPES.FETCH,
			});
			const { data } = await api.get(`/chats/${id}/messages`);

			dispatch({
				type: MESSAGE_ACTION_TYPES.FETCH_SUCCESS,
				payload: data,
			});
		} else {
			dispatch({
				type: MESSAGE_ACTION_TYPES.FETCH_SUCCESS,
				payload: null,
			});
		}
	} catch (error) {
		console.error(error);

		dispatch({
			type: MESSAGE_ACTION_TYPES.FETCH_ERROR,
			payload: "Error",
		});
	}
};

export const sendMessage =
	({ id, type = "simple", text, attachments }) =>
	async (dispatch) => {
		try {
			const { data } = await api.post(`/chats/${id}/messages`, {
				text,
				type,
				attachments,
			});

			dispatch({
				type: MESSAGE_ACTION_TYPES.PUSH_MESSAGE,
				payload: data,
			});
		} catch (error) {
			console.error(error);

			dispatch({
				type: MESSAGE_ACTION_TYPES.FETCH_ERROR,
				payload: "Error",
			});
		}
	};
