export const CHAT_ACTION_TYPES = {
	FETCH: "CHAT:FETCH",
	FETCH_SUCCESS: "CHAT:FETCH_SUCCESS",
	FETCH_ERROR: "CHAT:FETCH_ERROR",
	SET_SELECTED: "CHAT:SET_SELECTED",
};

const initialState = {
	items: null,
	loading: false,
	error: null,
	selected: null,
};

export default function chatReducer(state = initialState, { type, payload }) {
	switch (type) {
		case CHAT_ACTION_TYPES.FETCH: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case CHAT_ACTION_TYPES.FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				items: payload,
				error: null,
			};
		}
		case CHAT_ACTION_TYPES.FETCH_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}
		case CHAT_ACTION_TYPES.SET_SELECTED: {
			return {
				...state,
				selected: payload,
			};
		}
		default:
			return state;
	}
}
