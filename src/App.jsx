import { Login, Registr } from "pages";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes className="wrapper">
			<Route path="/login" element={<Login />} />F
			<Route path="/registr" element={<Registr />} />
		</Routes>
	);
}

export default App;
