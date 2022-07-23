import Auth from "pages/Auth";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes className="wrapper">
			<Route path="/login" element={<Auth />} />
		</Routes>
	);
}

export default App;
