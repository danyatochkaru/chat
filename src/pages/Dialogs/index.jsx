import React from "react";
import "./Dialogs.scss";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

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

	const [searchParams] = useSearchParams();

	React.useEffect(() => {
		if (searchParams.has("window")) {
			if (searchParams.get("window") == "settings")
				setSettingsWindowVisible(true);
		} else {
			setSettingsWindowVisible(false);
		}
	}, [searchParams.get("window")]);

	return (
		<main className="main_container">
			<SidebarSection />
			<DialogSection />
			<SettingsWindow visible={settingsWindowVisible} />
		</main>
	);
};

export default Dialogs;
