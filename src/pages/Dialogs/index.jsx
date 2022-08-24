import React from "react";
import "./Dialogs.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SidebarSection, DialogSection } from "modules";

const Dialogs = () => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!session.items) {
			return navigate("/signin");
		}
	}, [session]);

	return (
		<main className="main_container">
			<SidebarSection />
			<DialogSection />
		</main>
	);
};

export default Dialogs;
