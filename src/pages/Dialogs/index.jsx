import React from "react";
import "./Dialogs.scss";
import { NavLink, useParams } from "react-router-dom";
import {
	FormOutlined,
	SearchOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Input, Badge } from "antd";

import { Message, Dialog, AudioMessage, Typing } from "components";
import { Avatar, ChatInput } from "components";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";

const Dialogs = () => {
	const [selectedDialog, setSelectedDialog] = React.useState({
		id: 103,
		username: "\\V/",
		online: true,
		image_path: "https://joeschmoe.io/api/v1/random",
	});

	const dialogs = [
		{
			account: {
				id: 1,
				username: "AAA",
				image_path:
					"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
			},
			createdAt: new Date("2022-07-24 21:44:01"),
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!",
			unread: 13,
		},
		{
			account: {
				id: 2,
				username: "bbb",
				image_path:
					"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
			},
			attachments: [
				{
					id: 4,
					file_name: "meme",
					file_url: "https://i.ytimg.com/vi/KxYDR0tI12I/maxresdefault.jpg",
					file_type: "image",
				},
				{
					id: 2,
					file_name: "meme 2",
					file_url: "https://media.sproutsocial.com/uploads/meme-example.jpg",
					file_type: "image",
				},
				{
					id: 3,
					file_name: "meme 3",
					file_url:
						"https://i.pinimg.com/474x/7b/b6/6b/7bb66b72dd5d822d48a2214683e43835.jpg",
					file_type: "image",
				},
			],
			createdAt: new Date("2022-07-25 17:38:21"),
			isMe: true,
			isReaded: true,
		},
		{
			account: {
				id: 103,
				username: "\\V/",
				online: true,
				image_path: "https://joeschmoe.io/api/v1/random",
			},
			attachments: [
				{
					id: 4,
					file_name: "meme",
					file_url: "https://i.ytimg.com/vi/KxYDR0tI12I/maxresdefault.jpg",
					file_type: "image",
				},
			],
			text: "Миааау 🐾",
			createdAt: new Date("2022-07-26 13:09:49"),
			isMe: true,
		},
		{
			account: {
				id: 10,
				username: "Uranus",
				online: true,
			},
			text: "Ты кто? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!",
			attachments: [
				{
					id: 4,
					file_name: "meme",
					file_url: "https://i.ytimg.com/vi/KxYDR0tI12I/maxresdefault.jpg",
					file_type: "image",
				},
				{
					id: 2,
					file_name: "meme 2",
					file_url: "https://media.sproutsocial.com/uploads/meme-example.jpg",
					file_type: "image",
				},
				{
					id: 3,
					file_name: "meme 3",
					file_url:
						"https://i.pinimg.com/474x/7b/b6/6b/7bb66b72dd5d822d48a2214683e43835.jpg",
					file_type: "image",
				},
			],
			createdAt: new Date("2022-07-27 19:59:11"),
		},
	];

	const { id } = useParams();

	React.useEffect(() => {
		const accounts = [
			{
				id: 1,
				username: "AAA",
				image_path:
					"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
			},
			{
				id: 2,
				username: "bbb",
				image_path:
					"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
			},
			{
				id: 103,
				username: "\\V/",
				online: true,
				image_path: "https://joeschmoe.io/api/v1/random",
			},
			{
				id: 10,
				username: "Uranus",
				online: true,
			},
		];

		if (id) setSelectedDialog(accounts.find((ac) => ac.id === Number(id)));
		else
			setSelectedDialog({
				username: "Общий чат",
				image_path:
					"https://cdn.icon-icons.com/icons2/916/PNG/512/Chat_icon-icons.com_71840.png",
			});
	}, [id]);

	React.useLayoutEffect(() => {
		let title = "Chat";

		dialogs.forEach((d) => {
			if (d.account.id === selectedDialog.id)
				title = `${d?.unread ? `(${d?.unread}) ` : ""}${
					d?.account?.username ?? "Диалоги"
				} - Chat`;
		});

		window.document.title = title;
	}, [selectedDialog]);

	return (
		<main className="main_container">
			<section className="sidebar">
				<header className="sidebar__header">
					<span>
						<TeamOutlined />
						<h4 className="sidebar__title">Список диалогов</h4>
					</span>
					<FormOutlined />
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
					<Dialog
						account={{
							username: "Общий чат",
							image_path:
								"https://cdn.icon-icons.com/icons2/916/PNG/512/Chat_icon-icons.com_71840.png",
						}}
						text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
						createdAt={new Date("2022-07-24 21:44:01")}
						isActive={isNaN(id)}
						unReaded={13}
					/>
					{dialogs.map((d) => (
						<Dialog
							account={d.account}
							text={d.text}
							attachments={d.attachments}
							createdAt={d.createdAt}
							isMe={d.isMe}
							isReaded={d.isReaded}
							hasError={d.hasError}
							isActive={d.account.id === Number(id)}
							unread={d.unread}
						/>
					))}
				</div>
			</section>
			<section className="dialog">
				<div className="dialog__header">
					<div />
					<span>
						<div className="dialog__header-avatar">
							<NavLink
								to={
									selectedDialog?.id
										? `/profile/${selectedDialog?.id}`
										: `/dialogs`
								}
							>
								<Badge
									dot={selectedDialog?.online}
									color="green"
									offset={[-4, 28]}
								>
									<Avatar account={selectedDialog} />
								</Badge>
							</NavLink>
						</div>
						<NavLink
							to={
								selectedDialog?.id
									? `/profile/${selectedDialog?.id}`
									: `/dialogs`
							}
						>
							<h3 className="dialog__header-title">
								{selectedDialog.username}
							</h3>
						</NavLink>
					</span>
					<MenuIcon className="more__btn" />
				</div>
				<div className="dialog__messages">
					<AudioMessage
						account={{
							id: 2,
							username: "bbb",
							image_path:
								"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
						}}
						audio={{
							url: "https://www.prokerala.com/downloads/ringtones/files/mp3/aud-20220706-wa0010-57510.mp3",
						}}
						createdAt={new Date("2022-07-26 13:19:49")}
						isMe
						isReaded
					/>
					<AudioMessage
						account={{
							id: 2,
							username: "bbb",
							image_path:
								"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
						}}
						audio={{
							url: "https://www.prokerala.com/downloads/ringtones/files/mp3/bon-ring-57501.mp3",
						}}
						createdAt={new Date("2022-07-26 13:19:49")}
					/>
					<Message
						account={{
							id: 1,
							username: "AAA",
							image_path:
								"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
						}}
						text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
						createdAt={new Date("2022-06-24 21:44:01")}
					/>
					<Message
						account={{
							id: 2,
							username: "bbb",
							image_path:
								"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
						}}
						text="Long text"
						createdAt={new Date("2022-07-22 12:45:39")}
						isMe
						isReaded
					/>
					<Message
						account={{
							id: 10,
							username: "Uranus",
							online: true,
						}}
						text="У меня тут немножко мемов. Держи :)"
						attachments={[
							{
								id: 1,
								file_name: "meme",
								file_url:
									"https://i.pinimg.com/originals/c0/4f/12/c04f12db21b2c2c9ad233344596becc0.jpg",
								file_type: "image",
							},
							{
								id: 2,
								file_name: "meme 2",
								file_url:
									"https://media.sproutsocial.com/uploads/meme-example.jpg",
								file_type: "image",
							},
							{
								id: 3,
								file_name: "meme 3",
								file_url:
									"https://i.pinimg.com/474x/7b/b6/6b/7bb66b72dd5d822d48a2214683e43835.jpg",
								file_type: "image",
							},
						]}
						createdAt={new Date("2022-07-25 13:04:00")}
					/>
					<Message
						account={{
							id: 2,
							username: "bbb",
							image_path:
								"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
						}}
						attachments={[
							{
								id: 4,
								file_name: "meme",
								file_url:
									"https://i.ytimg.com/vi/KxYDR0tI12I/maxresdefault.jpg",
								file_type: "image",
							},
						]}
						createdAt={new Date("2022-07-25 17:38:21")}
						isMe
					/>
					<Message
						account={{
							id: 2,
							username: "bbb",
							image_path:
								"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
						}}
						text="Миааау 🐾"
						createdAt={new Date("2022-07-26 13:09:49")}
						isMe
						hasError
					/>
					<Typing
						accounts={[
							{
								id: 1,
								username: "AAA",
								image_path:
									"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
							},
							{
								id: 10,
								username: "Uranus",
								online: true,
							},
							{
								id: 2,
								username: "bbb",
								image_path:
									"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
							},
							{
								id: 103,
								username: "\\V/",
								online: true,
								image_path: "https://joeschmoe.io/api/v1/random",
							},
						]}
					/>
				</div>
				<ChatInput />
			</section>
		</main>
	);
};

export default Dialogs;
