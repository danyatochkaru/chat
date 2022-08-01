import React from "react";
import "./Dialogs.scss";
import { useParams } from "react-router-dom";

import { SidebarSection, DialogSection } from "modules";

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
				id: 11,
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
		if (id) setSelectedDialog(dialogs.find((di) => di.account?.id === Number(id)));
		else
			setSelectedDialog({
				username: "Общий чат",
			});
	}, [id]);

	React.useLayoutEffect(() => {
		let title = "Чат";

		dialogs.forEach((d) => {
			if (d.account.id === selectedDialog.id)
				title = `${d?.unread ? `(${d?.unread}) ` : ""}${
					d?.account?.username ?? "Диалоги"
				} - Чат`;
		});

		window.document.title = title;
	}, [selectedDialog]);

	return (
		<main className="main_container">
			<SidebarSection dialogs={dialogs} isSearch={false} id={id} />
			<DialogSection dialog={selectedDialog} />
		</main>
	);
};

export default Dialogs;
