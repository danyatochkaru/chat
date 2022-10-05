import React from "react";
import "./Dialogs.scss";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SidebarSection, DialogSection } from "modules";
import { SettingsWindow } from "components";
import { useAction } from "hooks";
import { io } from "socket.io-client";

const Dialogs = () => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();

	React.useLayoutEffect(() => {
		if (!session.items && session.isInit) {
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

	const { fetchChats, fetchMessagesByChatId } = useAction();

	const socketRef = React.useRef(null);

	React.useEffect(() => {
		fetchChats();

		socketRef.current = io("https://chat.danyatochka.ru", {
			withCredentials: true,
			autoConnect: true,
			transports: ["websocket"],
		});

		return () => {
			socketRef.current && socketRef.current.close();
		};
	}, []);

	const updateMessagesData = (chatId) => {
		fetchChats();
		// console.log(searchParams.get("id"), chatId);
		if (searchParams.has("id") && searchParams.get("id") == chatId) {
			fetchMessagesByChatId(searchParams.get("id"));
			debugger;
		}
		debugger;
	};

	React.useEffect(() => {
		socketRef.current.on("CHAT:NEW_MESSAGE", updateMessagesData);

		socketRef.current.on("CHAT:MESSAGES_READED", updateMessagesData);

		socketRef.current.on("connect", () => console.log("connect"));
		socketRef.current.on("disconnect", () => console.log("disconnect"));
	}, [socketRef.current]);

	React.useEffect(() => {
		if (searchParams.has("id")) {
			socketRef.current.emit("CHAT:JOIN", searchParams.get("id"));
		}
	}, [searchParams.get("id")]);

	return (
		<main className="main_container">
			<SidebarSection />
			<DialogSection />
			<SettingsWindow visible={settingsWindowVisible} />
		</main>
	);
};

export default Dialogs;
