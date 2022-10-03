import { InboxOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import React from "react";

export default function UploadFiles({ visible, handleOk, handleCancel }) {
	return (
		<Modal
			title="Загрузка файлов"
			visible={false}
			onOk={handleOk}
			onCancel={handleCancel}
			okText={"Отправить"}
			cancelText={"Отмена"}
			destroyOnClose
		>
			<Dragger
				multiple={true}
				maxCount={5}
				action="https://chat.danyatochka.ru/api/v1/files"
			>
				<InboxOutlined />
				<p>Нажмите, чтобы выбрать файлы для загрузки</p>
				<p>Или перетащите их в это поле</p>
				<p>(макс. 5)</p>
			</Dragger>
		</Modal>
	);
}
