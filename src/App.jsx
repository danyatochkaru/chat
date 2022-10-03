import React from "react";

import { Login, Registr, Dialogs } from "pages";
import { useAction } from "hooks";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Empty = () => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();

	React.useEffect(() => {
		navigate(session.items ? "/chats" : "/signin");
	}, [session]);

	return (
		<div className="empty">
			{/* <center>
				<h3>
					<b>Coming soon</b>
				</h3>
				<nav>
					<li>
						<NavLink to={"/signin"}>Login</NavLink>
					</li>
					<li>
						<NavLink to={"/signup"}>Registr</NavLink>
					</li>
					<li>
						<NavLink to={"/chats"}>Dialogs</NavLink>
					</li>
					<li>
						<a onClick={logout}>Logout</a>
					</li>
				</nav>
			</center> */}
		</div>
	);
};

function App() {
	const { fetchSession } = useAction();

	React.useEffect(() => {
		if (localStorage.getItem("token")) {
			fetchSession();
		}
	}, []);

	return (
		<Routes className="wrapper">
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<Registr />} />
			<Route path="/chats/:id" element={<Dialogs />} />
			<Route path="/chats" element={<Dialogs />} />
			<Route path="*" element={<Empty />} />
		</Routes>
	);
}

export default App;
