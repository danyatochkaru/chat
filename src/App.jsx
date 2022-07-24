import { Login, Registr, Dialogs } from "pages";
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
					<NavLink to={"/sugnup"}>Registr</NavLink>
				</li>
			</nav>
		</center>
	</div>
);

function App() {
	return (
		<Routes className="wrapper">
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<Registr />} />
			<Route path="/dialogs" element={<Dialogs />} />
			<Route path="/profile" element={<Empty />} />
			<Route path="/settings" element={<Empty />} />
			<Route path="*" element={<Empty />} />
		</Routes>
	);
}

export default App;
