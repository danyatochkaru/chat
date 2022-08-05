import React from "react";
import "./Sidebar.scss";
import { FormOutlined, LoadingOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Empty, Input } from "antd";

import { Dialog } from "components";
import { useSelector } from "react-redux";
import { useAction } from "../../../hooks";
import { useSearchParams } from "react-router-dom";

const Sidebar = ({ isSearch }) => {
	const chat = useSelector((store) => store.chat);
	const session = useSelector((state) => state.session);
	const { fetchChats, selectChat } = useAction();

	const [searchParams] = useSearchParams();

	React.useEffect(() => {
		fetchChats();
	}, []);

	React.useEffect(() => {
		if (searchParams.has("id")) selectChat(searchParams.get("id"));
	}, [searchParams.get("id")]);

	React.useLayoutEffect(() => {
		let title = "Чат";

		chat.items?.forEach((_chat) => {
			if (_chat?.id === chat.selected?.id)
				title = `${_chat?.unread_count ? `(${_chat?.unread_count}) ` : ""}${
					_chat?.account?.username ?? "Диалоги"
				} - Чат`;
		});

		window.document.title = title;
	}, [chat.selected?.id]);

	if (chat.loading) return <LoadingOutlined spin />;

	return (
		<section className="sidebar">
			<header className="sidebar__header">
				<span>
					<TeamOutlined />
					<h4 className="sidebar__title">Список диалогов</h4>
				</span>
				<Button type="text" shape="circle" icon={<FormOutlined />} />
			</header>
			<div className="sidebar__search">
				<Input
					className="sidebar__search-input"
					placeholder="Поиск среди контактов"
					prefix={<SearchOutlined />}
					allowClear
					bordered={false}
				/>
			</div>
			<div className="sidebar__dialogs_list">
				{isSearch ? (
					chat.items?.length ? (
						chat.items?.map((d) => (
							<Dialog
								key={d.id}
								account={d.accounts.find(
									(a) => a.id !== parseInt(session.items?.id),
								)}
								id={d.id}
								message={d.messages[0]}
								unread_count={d.unread_count}
								isActive={d?.id === chat.selected?.id}
								isMe={d.messages[0].accountId === parseInt(session.items?.id)}
								// hasError={d.hasError}
							/>
						))
					) : (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description="Поиск завершился пустым результатом"
						/>
					)
				) : (
					<>
						{chat.items?.length > 0 &&
							chat.items?.map((d) => (
								<Dialog
									key={d.id}
									account={d.accounts.find(
										(a) => a.id !== parseInt(session.items?.id),
									)}
									id={d.id}
									message={d.messages[0]}
									unread_count={d.unread_count}
									isActive={d?.id === chat.selected?.id}
									isMe={d.messages[0].accountId === parseInt(session.items?.id)}
									// hasError={d.hasError}
								/>
							))}
					</>
				)}
			</div>
		</section>
	);
};

export default Sidebar;
