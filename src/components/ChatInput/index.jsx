import React from "react";
import "./ChatInput.scss";
import Picker from "@emoji-mart/react";

import {
	AudioOutlined,
	PaperClipOutlined,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

const ChatInput = ({ disabled }) => {
	const inputRef = React.useRef();
	const [inputValue, setInputValue] = React.useState("");
	const [emojiPickerVisible, setEmojiPickerVisible] = React.useState(false);

	const onChange = (e) => {
		setInputValue(e.target.value);
		setEmojiPickerVisible(false);
	};

	React.useEffect(() => {
		setEmojiPickerVisible(false);
	}, [disabled]);

	const insertEmoji = (data) => {
		inputRef.current.focus();
		const len = inputRef.current?.input.value.length;
		const start = inputRef.current?.input.selectionStart;
		const end = inputRef.current?.input.selectionEnd;

		let newValue =
			inputRef.current?.input.value.substring(0, start) +
			data.native +
			inputRef.current?.input.value.substring(end, len);
		setInputValue(newValue);
		setTimeout(
			() =>
				inputRef.current.setSelectionRange(
					data.native.length + start,
					data.native.length + start,
				),
			0,
		);
	};

	return (
		<div className={"dialog__input"}>
			{emojiPickerVisible && (
				<span className={"dialog__emoji_piker"}>
					<Picker
						previewPosition="none"
						autoFocus={true}
						emojiButtonSize={32}
						emojiSize={18}
						icons="outline"
						locale="ru"
						navPosition="bottom"
						theme="light"
						onEmojiSelect={insertEmoji}
					/>
				</span>
			)}
			<Button
				type="text"
				shape="circle"
				icon={<SmileOutlined />}
				onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
			/>

			<Input
				placeholder="Введите текст сообщения..."
				bordered={false}
				onChange={onChange}
				value={inputValue}
				ref={inputRef}
			/>
			<Button type="text" shape="circle" icon={<PaperClipOutlined />} />
			{inputValue.length ? (
				<Button
					disabled={disabled}
					type="text"
					shape="circle"
					icon={<SendOutlined className="dialog__input-light" />}
				/>
			) : (
				<Button
					disabled={disabled}
					type="text"
					shape="circle"
					icon={<AudioOutlined />}
				/>
			)}
		</div>
	);
};

export default ChatInput;
