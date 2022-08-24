import React from "react";

import { Login, Registr, Dialogs } from "pages";
import { useAction } from "hooks";
import { Routes, Route, NavLink } from "react-router-dom";

const Empty = () => (
	<div className="empty">
		<center>
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
			</nav>
		</center>
	</div>
);

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
			<Route path="/profile" element={<Empty />} />
			<Route path="/settings" element={<Empty />} />
			<Route path="*" element={<Empty />} />
		</Routes>
	);
}

export default App;
