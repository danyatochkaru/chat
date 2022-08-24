import { Input, Modal } from "antd";
import React from "react";

const NewChat = ({ formControl, show, handleOk, handleCancel }) => {
	return (
		<Modal
			title="Новый чат"
			visible={show}
			onOk={handleOk}
			onCancel={handleCancel}
			okText={"Создать"}
			cancelText={"Отмена"}
			destroyOnClose
			centered
		>
			С кем?
			<form name="new_chat">
				<Input
					name="uuid"
					value={formControl?.values?.uuid}
					onChange={formControl?.handleChange}
					placeholder="id"
				/>
			</form>
		</Modal>
	);
};

export default NewChat;
