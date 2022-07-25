import React from "react";
import "./Dialogs.scss";

import { Message } from "components";

const Dialogs = () => {
	return (
		<main className="messages">
			<Message
				account={{
					username: "AAA",
					image_path:
						"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
				}}
				text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
				createdAt={new Date("2022-07-25 12:44:01")}
			/>
			<Message
				account={{
					username: "Loh",
					image_path:
						"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
				}}
				text="Long text"
				createdAt={new Date("2022-07-25 12:45:39")}
				isMe={true}
				isReaded={true}
			/>
			<Message
				account={{
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
						file_url: "https://media.sproutsocial.com/uploads/meme-example.jpg",
						file_type: "image",
					},
					{
						id: 3,
						file_name: "meme 3",
						file_url:
							"https://i.pinimg.com/originals/82/08/fe/8208fe67a521fd3fd8af5902f7292ccc.jpg",
						file_type: "image",
					},
				]}
				createdAt={new Date("2022-07-25 13:04:00")}
			/>
			<Message
				account={{
					username: "AAA",
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
				isMe={true}
			/>
		</main>
	);
};

export default Dialogs;
