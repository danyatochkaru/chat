import React from "react";
import "./Dialogs.scss";

import { SidebarSection, DialogSection } from "modules";

const Dialogs = () => {
	return (
		<main className="main_container">
			<SidebarSection isSearch={false} />
			<DialogSection dialog={{account:{id: 1,username: "Test"}}} />
		</main>
	);
};

export default Dialogs;
