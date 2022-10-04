import { Input, Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import classNames from "classnames";
import "./MessageEdit.scss";

export default function MessageEdit({ type, text, id, visible, hide }) {
	const formik = useFormik({
		initialValues: {
			text: text ?? "",
		},
		validationSchema: Yup.object().shape({
			text: Yup.string()
				.min(1, "Сообщение должно содержать минимум 1 символ")
				.max(200, "Сообщение должно содержать максимум 200 символов")
				.required("Сообщение должно содержать минимум 1 символ"),
		}),
		onSubmit: async (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const submit = () => {
		formik.submitForm();
	};

	return (
		<Modal
			okText={type == "delete" ? "Удалить" : "Изменить"}
			title={
				type == "delete" ? "Удаление сообщения" : "Редактирование сообщения"
			}
			cancelText={"Отмена"}
			okType={type == "delete" ? "danger" : "primary"}
			destroyOnClose
			centered
			onOk={submit}
			visible={visible}
			onCancel={hide}
		>
			<Input
				size="large"
				placeholder="Сообщение"
				name="text"
				onChange={formik.handleChange}
				value={formik.values.text}
				disabled={type == "delete"}
				status={formik.errors.text && formik.touched.text ? "error" : null}
			/>
			<div
				className={classNames("error", {
					"error--active": formik.errors.text && formik.touched.text,
				})}
			>
				{formik.errors.text && formik.touched.text ? formik.errors.text : null}
			</div>
		</Modal>
	);
}
