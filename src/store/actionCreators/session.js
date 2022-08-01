import { SESSION_ACTION_TYPES } from "../reducers/session.js";
import api from "./api.js";

export const fetchSession = () => async (dispatch) => {
	try {
		dispatch({
			type: SESSION_ACTION_TYPES.FETCH,
		});
		const { data } = await api.get("/session");

		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_SUCCESS,
			payload: data,
		});
	} catch (error) {
		console.error(error);

		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_ERROR,
			payload: "Error",
		});
	}
};
