import axios from "axios";
import { SESSION_ACTION_TYPES } from "../reducers/session.js";
import api from "./api.js";

export const fetchSession = () => async (dispatch) => {
	try {
		dispatch({
			type: SESSION_ACTION_TYPES.FETCH,
		});

		const host = process.env.REACT_APP_API_HOST ?? "localhost",
			port = process.env.REACT_APP_API_PORT ?? "",
			baseUrl = process.env.REACT_APP_API_BASE_URL ?? "api",
			protocol = process.env.REACT_APP_API_PROTOCOL ?? "http";

		const { data } = await axios.get(
			`${protocol}://${host}${port}/${baseUrl}/sessions/refresh`,
			{ withCredentials: true },
		);
		localStorage.setItem("token", data.accessToken);
		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_SUCCESS,
			payload: data,
		});
		dispatch({
			type: SESSION_ACTION_TYPES.INIT,
		});
	} catch (error) {
		console.error(error);

		dispatch({
			type: SESSION_ACTION_TYPES.FETCH_ERROR,
			payload: "",
		});
		dispatch({
			type: SESSION_ACTION_TYPES.INIT,
		});
	}
};

export const login =
	({ email, password }) =>
	async (dispatch) => {
		try {
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
