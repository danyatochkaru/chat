export const SESSION_ACTION_TYPES = {
	FETCH: "SESSION:FETCH",
	FETCH_SUCCESS: "SESSION:FETCH_SUCCESS",
	FETCH_ERROR: "SESSION:FETCH_ERROR",
};

const initialState = {
	items: null,
	loading: false,
	error: null,
};

export default function sessionReducer(
	state = initialState,
	{ type, payload },
) {
	switch (type) {
		case SESSION_ACTION_TYPES.FETCH: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case SESSION_ACTION_TYPES.FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				items: payload,
				error: null,
			};
		}
		case SESSION_ACTION_TYPES.FETCH_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}
		default:
			return state;
	}
}
