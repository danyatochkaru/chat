import React from "react";
import './Dialogs.scss';

import { Message } from "components";

const Dialogs = () => {
	return (
		<main className="messages">
			<Message
				account={{
					username: "Loh",
					image_path:
						"https://pluspng.com/img-png/png-hd-pig-pig-png-image-pig-hd-png-baby-pig-png-hd-2054.png",
				}}
				text="Lol"
				createdAt={new Date(1658694300000)}
				files="test.png"
				isMe={true}
			/>
			<Message
				account={{
					username: "AAA",
					image_path:
						"https://www.collinsdictionary.com/images/full/river_377603497_1000.jpg",
				}}
				text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
				createdAt={new Date().toISOString()}
			/>
		</main>
	);
};

export default Dialogs;
