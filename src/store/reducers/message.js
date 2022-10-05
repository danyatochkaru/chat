export const MESSAGE_ACTION_TYPES = {
	FETCH: "MESSAGE:FETCH",
	FETCH_SUCCESS: "MESSAGE:FETCH_SUCCESS",
	FETCH_ERROR: "MESSAGE:FETCH_ERROR",
};

const initialState = {
	items: null,
	loading: false,
	error: null,
};

export default function messageReducer(
	state = initialState,
	{ type, payload },
) {
	switch (type) {
		case MESSAGE_ACTION_TYPES.FETCH: {
			return {
				...state,
				loading: true,
				items: null,
				error: null,
			};
		}
		case MESSAGE_ACTION_TYPES.FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				items: payload ? { ...payload, rows: payload.rows.reverse() } : [],
				error: null,
			};
		}
		case MESSAGE_ACTION_TYPES.FETCH_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				items: null,
			};
		}
		default:
			return state;
	}
}
