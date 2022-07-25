import React from "react";
import "./Dialogs.scss";

import { Message } from "components";
import Dialog from "../../components/Dialog";

const Dialogs = () => {
	return (
		<main className="main_container">
			<section className="dialogs">
				<Dialog
					account={{
						id: 1,
						username: "AAA",
						image_path:
							"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
					}}
					text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
					createdAt={new Date("2022-06-24 21:44:01")}
					isReaded
				/>
				<Dialog
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
			</section>
			<section className="messages">
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
						id: 1,
						username: "AAA",
						image_path:
							"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
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
						id: 1,
						username: "AAA",
						image_path:
							"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
					}}
					isTyping
				/>
			</section>
		</main>
	);
};

export default Dialogs;
