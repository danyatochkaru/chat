import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import actionCreators from "../store/actionCreators/index.js";

export const useAppDispatch = () => useDispatch();

export const useAction = () => {
	const dispatch = useAppDispatch();
	return bindActionCreators(actionCreators, dispatch);
};
