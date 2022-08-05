import { MESSAGE_ACTION_TYPES } from "../reducers/message.js";
import api from "./api.js";

export const fetchMessagesByChatId = (id) => async (dispatch) => {
	try {
		dispatch({
			type: MESSAGE_ACTION_TYPES.FETCH,
		});
		const { data } = await api.get(`/chats/${id}/messages`);

		dispatch({
			type: MESSAGE_ACTION_TYPES.FETCH_SUCCESS,
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
