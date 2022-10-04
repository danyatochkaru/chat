import React from "react";
import "./Dialogs.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SidebarSection, DialogSection } from "modules";
import { SettingsWindow } from "components";

const Dialogs = () => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!session.items) {
			return navigate("/signin");
		}
	}, [session]);

	const [settingsWindowVisible, setSettingsWindowVisible] =
		React.useState(false);

	return (
		<main className="main_container">
			<SidebarSection
				showSettingsWindow={() => setSettingsWindowVisible(true)}
			/>
			<DialogSection />
			<SettingsWindow
				visible={settingsWindowVisible}
				hide={() => setSettingsWindowVisible(false)}
			/>
		</main>
	);
};

export default Dialogs;
