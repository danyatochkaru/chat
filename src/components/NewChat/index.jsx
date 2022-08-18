import { Modal } from "antd";
import React from "react";

const NewChat = ({ show, handleOk, handleCancel }) => {
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
			Ты кто?
		</Modal>
	);
};

export default NewChat;
