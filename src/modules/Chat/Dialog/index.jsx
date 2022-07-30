import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import "./Dialog.scss";

import { Message, AudioMessage, Typing, Avatar, ChatInput } from "components";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";

const Dialog = ({ dialog }) => {
	const messages = [
		{
			id: 1,
			account: {
				id: 1,
				username: "AAA",
				online: false,
			},
			createdAt: new Date("2022-07-26 13:19:49"),
			text: "Long text",
			isReaded: true,
			isMe: false,
			attachments: [
				{
					id: 1,
					file_name: "meme",
					file_url:
						"https://i.pinimg.com/originals/c0/4f/12/c04f12db21b2c2c9ad233344596becc0.jpg",
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
			audio: null,
		},
		{
			id: 2,
			account: {
				id: 2,
				username: "bbb",
				online: true,
			},
			createdAt: new Date("2022-07-26 13:32:19"),
			text: null,
			isReaded: false,
			isMe: true,
			attachments: null,
			audio:
				"https://www.prokerala.com/downloads/ringtones/files/mp3/aud-20220706-wa0010-57510.mp3",
		},
	];
	const isTyping = true

	return (
		<section className="dialog">
			<div className="dialog__header">
				<div />
				<span>
					<div className="dialog__header-avatar">
						<Link
							to={
								dialog?.account?.id
									? `/profile/${dialog?.account?.id}`
									: `/dialogs`
							}
						>
							<Badge
								dot={dialog?.account?.online}
								color="green"
								offset={[-4, 28]}
							>
								<Avatar account={dialog?.account} />
							</Badge>
						</Link>
					</div>
					<Link
						to={
							dialog?.account?.id
								? `/profile/${dialog?.account?.id}`
								: `/dialogs`
						}
					>
						<h3 className="dialog__header-title">
							{dialog?.account?.username}
						</h3>
					</Link>
				</span>
				<Button
					type="text"
					shape="circle"
					icon={<MenuIcon className="more__btn" />}
				/>
			</div>
			<div className="dialog__messages">
				{messages.map((m) =>
					m.audio ? <AudioMessage {...m} /> : <Message {...m} />,
				)}
				{isTyping && dialog?.account?.id && <Typing accounts={[dialog?.account]} />}
				{/* <AudioMessage
					account={{
						id: 2,
						username: "bbb",
						image_path:
							"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
					}}
					audio={"https://www.prokerala.com/downloads/ringtones/files/mp3/aud-20220706-wa0010-57510.mp3"}
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
					audio={"https://www.prokerala.com/downloads/ringtones/files/mp3/bon-ring-57501.mp3"}
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
							file_url: "https://i.ytimg.com/vi/KxYDR0tI12I/maxresdefault.jpg",
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
				/> */}
			</div>
			<ChatInput />
		</section>
	);
};

export default Dialog;
