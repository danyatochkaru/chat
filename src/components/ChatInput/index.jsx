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
import { useFormik } from "formik";
import { useAction } from "../../hooks";
import { useSelector } from "react-redux";

const ChatInput = ({ disabled }) => {
	const inputRef = React.useRef();
	const [emojiPickerVisible, setEmojiPickerVisible] = React.useState(false);
	const { sendMessage } = useAction();
	const chat = useSelector((store) => store.chat);

	const formik = useFormik({
		initialValues: {
			chatText: "",
		},
		onSubmit: (v) => {
			sendMessage({ id: chat.selected.id, text: v.chatText });
		},
	});

	const onChange = (e) => {
		setEmojiPickerVisible(false);
		formik.setFieldValue("chatText", e.target.value);
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
		formik.setFieldValue("chatText", newValue);
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
		<form className={"dialog__input"} onSubmit={formik.handleSubmit}>
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
				value={formik.values.chatText}
				ref={inputRef}
			/>
			<Button type="text" shape="circle" icon={<PaperClipOutlined />} />
			{formik.values.chatText.length ? (
				<Button
					disabled={disabled}
					type="text"
					htmlType="submit"
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
		</form>
	);
};

export default ChatInput;
