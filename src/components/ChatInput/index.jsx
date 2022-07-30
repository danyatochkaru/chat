import React from "react";
import "./ChatInput.scss";

import {
	AudioOutlined,
	PaperClipOutlined,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

const ChatInput = () => {
	const [inputValue, setInputValue] = React.useState("");

	const onChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className={"dialog__input"}>
			<Button type="text" shape="circle" icon={<SmileOutlined />} />

			<Input
				placeholder="Введите текст сообщения..."
				bordered={false}
				onChange={onChange}
				value={inputValue}
			/>
			<Button type="text" shape="circle" icon={<PaperClipOutlined />} />
			{inputValue.length ? (
				<Button
					type="text"
					shape="circle"
					icon={<SendOutlined className="dialog__input-light" />}
				/>
			) : (
				<Button type="text" shape="circle" icon={<AudioOutlined />} />
			)}
		</div>
	);
};

export default ChatInput;
