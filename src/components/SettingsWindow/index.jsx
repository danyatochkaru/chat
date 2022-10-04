import { Button, Input, Modal, Upload } from "antd";
import React from "react";
import { Avatar } from "../index.js";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { useSelector } from "react-redux";
import "./SettingsWindow.scss";
import { DeleteOutlined, PictureOutlined } from "@ant-design/icons";

export default function SettingsWindow({ visible, hide }) {
	const session = useSelector((state) => state.session);

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(3, "Минимум 3 символа")
			.max(20, "Максимум 20 символов"),
		email: Yup.string().email("Некорректная почта"),
		password: Yup.string()
			.min(5, "Минимум 5 символов")
			.max(20, "Не более 20 символов"),
		old_password: Yup.string().required("Вы не ввели старый пароль"),
	});

	const formik = useFormik({
		initialValues: {
			email: session.items?.account.email ?? "",
			username: session.items?.account.username ?? "",
			password: "",
			old_password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	const close = () => {
		formik.resetForm();
		hide();
	};

	const uploadFile = (options) => {
		console.log(options);
		alert("ok");
	};

	return (
		<Modal
			title={"Настройки профиля"}
			okText={"Сохранить"}
			onOk={formik.submitForm}
			cancelText={"Отмена"}
			onCancel={close}
			destroyOnClose={true}
			centered
			visible={visible}
		>
			<div className="settings">
				<div className="settings__photo">
					<Avatar size={96} account={session.items?.account} />
					<div className="settings__photo__buttons">
						<Upload showUploadList={false} customRequest={uploadFile}>
							<Button icon={<PictureOutlined />} type="primary">
								Загрузить фото
							</Button>
						</Upload>
						<Button danger icon={<DeleteOutlined />} />
					</div>
				</div>
				<form>
					<Input
						size="large"
						placeholder="Отображаемое имя"
						name="username"
						onChange={formik.handleChange}
						value={formik.values.username}
						status={
							formik.errors.username && formik.touched.username ? "error" : null
						}
					/>
					<div
						className={classNames("error", {
							"error--active":
								formik.errors.username && formik.touched.username,
						})}
					>
						{formik.errors.username && formik.touched.username
							? formik.errors.username
							: null}
					</div>
					<Input
						size="large"
						placeholder="Почта"
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						status={
							formik.errors.email && formik.touched.email ? "error" : null
						}
					/>
					<div
						className={classNames("error", {
							"error--active": formik.errors.email && formik.touched.email,
						})}
					>
						{formik.errors.email && formik.touched.email
							? formik.errors.email
							: null}
					</div>
					<Input.Password
						size="large"
						placeholder="Новый пароль"
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
						status={
							formik.errors.password && formik.touched.password ? "error" : null
						}
					/>
					<div
						className={classNames("error", {
							"error--active":
								formik.errors.password && formik.touched.password,
						})}
					>
						{formik.errors.password && formik.touched.password
							? formik.errors.password
							: null}
					</div>
					<Input.Password
						size="large"
						placeholder="Старый пароль"
						name="old_password"
						required
						onChange={formik.handleChange}
						value={formik.values.old_password}
						status={
							formik.errors.old_password && formik.touched.old_password
								? "error"
								: null
						}
					/>
					<div
						className={classNames("error", {
							"error--active":
								formik.errors.old_password && formik.touched.old_password,
						})}
					>
						{formik.errors.old_password && formik.touched.old_password
							? formik.errors.old_password
							: null}
					</div>
				</form>
			</div>
		</Modal>
	);
}
