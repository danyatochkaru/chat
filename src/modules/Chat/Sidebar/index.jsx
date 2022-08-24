import React from "react";
import "./Sidebar.scss";
import {
	DeleteOutlined,
	FormOutlined,
	LoadingOutlined,
	NotificationOutlined,
	SearchOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import {
	Badge,
	Button,
	Card,
	Drawer,
	Empty,
	Input,
	message,
	Space,
	Spin,
} from "antd";

import { Dialog, NewChat } from "components";
import { useSelector } from "react-redux";
import { useAction } from "hooks";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";

const Sidebar = ({ isSearch }) => {
	const [showNewChat, setShowNewChat] = React.useState(false);
	const [showNotify, setShowNotify] = React.useState(false);
	const chat = useSelector((store) => store.chat);
	const session = useSelector((state) => state.session);
	const { fetchChats, selectChat, createNewChat } = useAction();

	const [searchParams] = useSearchParams();

	React.useEffect(() => {
		fetchChats();
	}, []);

	React.useEffect(() => {
		if (searchParams.has("id")) {
			selectChat(searchParams.get("id"));
		} else selectChat();
	}, [searchParams.get("id"), chat.items]);

	React.useEffect(() => {
		if (searchParams.has("window")) console.log(searchParams.get("window"));
	}, [searchParams.get("window")]);

	React.useLayoutEffect(() => {
		let title = "Чат";

		if (chat.selected) {
			const account = chat.selected?.accounts.find(
				(a) => a.uuid !== session.items?.account.uuid,
			);
			title = `${
				chat.selected.unread_count &&
				chat.selected.messages[0].account.uuid !== session.items?.account.uuid
					? `(${chat.selected.unread_count}) `
					: ""
			}${`${account?.username} - `}Чат`;
		}

		window.document.title = title;
	}, [chat.selected?.id]);

	const formik = useFormik({
		initialValues: {
			uuid: "",
		},
	});

	const attemptCreateChat = () => {
		debugger;
		if (formik.values.uuid.length) createNewChat(formik.values.uuid);
		setShowNewChat(false);
	};

	if (chat.loading)
		return (
			<section className="sidebar">
				<Spin
					indicator={<LoadingOutlined spin />}
					className="dialog__center"
					size="large"
					tip="Загрузка списка чатов..."
				/>
			</section>
		);

	return (
		<section className="sidebar">
			<header className="sidebar__header">
				<span>
					<TeamOutlined />
					<h4 className="sidebar__title">Список диалогов</h4>
				</span>
				<span>
					<Button
						type="text"
						shape="circle"
						icon={
							<Badge dot={true} offset={[-7, 2]}>
								<NotificationOutlined />
							</Badge>
						}
						onClick={() => {
							return new Date().getSeconds() % 2 === 1
								? setShowNotify(true)
								: message.info("Нет новых уведомлений");
						}}
					/>

					<Button
						type="text"
						shape="circle"
						icon={<FormOutlined />}
						onClick={() => setShowNewChat(true)}
					/>
				</span>
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
				{chat.items?.count ? (
					<>
						{chat.items?.count > 0 &&
							chat.items?.rows.map((d) => (
								<Dialog
									key={d.uuid}
									account={d.accounts.find(
										(a) => a.uuid !== session.items?.account.uuid,
									)}
									id={d.uuid}
									message={
										d.messages.length ? d.messages[0] : { text: <i>Пусто</i> }
									}
									unread_count={d.unread_count}
									isActive={d?.uuid === chat.selected?.uuid}
									isMe={
										d.messages.length > 0
											? d.messages[0]?.account.uuid ===
											  session.items?.account.uuid
											: false
									}
									// hasError={d.hasError}
								/>
							))}
					</>
				) : isSearch ? (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description="Поиск завершился пустым результатом"
					/>
				) : (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description="Список пуст"
					/>
				)}
			</div>
			<NewChat
				show={showNewChat}
				handleCancel={() => setShowNewChat(false)}
				handleOk={attemptCreateChat}
				formControl={formik}
			/>
			<Drawer
				visible={showNotify}
				title="Уведомления"
				placement="left"
				onClose={() => setShowNotify(false)}
			>
				<Space
					direction="vertical"
					size="middle"
					style={{
						display: "flex",
					}}
				>
					<Card
						title="Приглашение в чат"
						// bordered={false}
						size="small"
						style={{
							width: "100%",
						}}
						extra={
							<Button
								danger
								size="small"
								shape="circle"
								type="text"
								icon={<DeleteOutlined />}
							/>
						}
						actions={[
							<Button danger size="small">
								Отказаться
							</Button>,
							<Button type="primary" size="small">
								Принять
							</Button>,
						]}
					>
						Вадим предлагает вам присоедениться в чат "Влажные платочки"
					</Card>
					<Card
						title="Приглашение в чат"
						// bordered={false}
						size="small"
						style={{
							width: "100%",
						}}
						extra={
							<Button
								danger
								size="small"
								shape="circle"
								type="text"
								icon={<DeleteOutlined />}
							/>
						}
					>
						Миша оценил ваше фото
					</Card>
				</Space>
			</Drawer>
		</section>
	);
};

export default Sidebar;
