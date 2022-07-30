import React from "react";
import "./ChatInput.scss";

import {
	AudioOutlined,
	PaperClipOutlined,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const ChatInput = () => {
	const [inputValue, setInputValue] = React.useState("");

	const onChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="dialog__input">
			<SmileOutlined />
			<Input
				placeholder="Введите текст сообщения..."
				allowClear
				bordered={false}
				onChange={onChange}
				value={inputValue}
			/>
			<PaperClipOutlined />
			{inputValue.length ? <SendOutlined /> : <AudioOutlined />}
		</div>
	);
};

export default ChatInput;
