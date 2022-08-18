import { SESSION_ACTION_TYPES } from "../reducers/session.js";
import api from "./api.js";

// export const fetchSession = () => async (dispatch) => {
// 	try {
// 		dispatch({
// 			type: SESSION_ACTION_TYPES.FETCH,
// 		});
// 		const { data } = await api.get("/sessions");

// 		dispatch({
// 			type: SESSION_ACTION_TYPES.FETCH_SUCCESS,
// 			payload: data,
// 		});
// 	} catch (error) {
// 		console.error(error);

// 		dispatch({
// 			type: SESSION_ACTION_TYPES.FETCH_ERROR,
// 			payload: "Error",
// 		});
// 	}
// };

export const login =
	({ email, password }) =>
	async (dispatch) => {
		try {
			console.log(email, password);
			dispatch({
				type: SESSION_ACTION_TYPES.FETCH,
			});
			const { data } = await api.post("/sessions", {
				email,
				password,
			});
			localStorage.setItem("token", data.accessToken);

			dispatch({
				type: SESSION_ACTION_TYPES.FETCH_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.error(error);

			dispatch({
				type: SESSION_ACTION_TYPES.FETCH_ERROR,
				payload:
					typeof error.response.data?.msg === "string"
						? error.response.data.msg
						: "Error",
			});
		}
	};

export const registration =
	({ username, email, password }) =>
	async (dispatch) => {
		try {
			dispatch({
				type: SESSION_ACTION_TYPES.FETCH,
			});
			const { data } = await api.post("/accounts", {
				username,
				email,
				password,
			});
			localStorage.setItem("token", data.accessToken);

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

export const logout = () => async (dispatch) => {
	try {
		dispatch({
			type: SESSION_ACTION_TYPES.FETCH,
		});

		await api.delete("/sessions");
		localStorage.removeItem("token");

		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_SUCCESS,
			payload: null,
		});
	} catch (error) {
		console.error(error);

		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_ERROR,
			payload: "Error",
		});
	}
};
