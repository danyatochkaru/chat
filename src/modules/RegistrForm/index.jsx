import React from "react";
import { Input, Form } from "antd";
import { NavLink } from "react-router-dom";
import { Button } from "components";

const LoginForm = () => {
	const [form] = Form.useForm();

	return (
		<Form name="registr" form={form}>
			<Form.Item
				name={"email"}
				rules={[
					{
						required: true,
						message: "Вы не ввели почту",
					},
					{
						type: "email",
						message: "Введите настоящую почту",
					},
				]}
				hasFeedback={true}
				status={form.getFieldError("email").length > 0 ? "error" : "success"}
			>
				<Input size="large" placeholder="Почта" />
			</Form.Item>
			<Form.Item
				name={"username"}
				rules={[
					{
						required: true,
						message: "Вы не ввели отображаемое имя",
					},
					{
						whitespace: true,
						message: "Отображаемое имя не может быть пустым",
					},
					{
						min: 3,
						message: "Минимум 3 символa",
					},
					{
						max: 28,
						message: "Максимум 28 символов",
					},
				]}
				hasFeedback={true}
			>
				<Input size="large" placeholder="Отображаемое имя" />
			</Form.Item>
			<Form.Item
				name={"password"}
				rules={[
					{
						required: true,
						message: "Вы не ввели пароль",
					},
					{
						min: 5,
						message: "Минимум 5 символов",
					},
				]}
				hasFeedback={true}
			>
				<Input.Password size="large" placeholder="Пароль" />
			</Form.Item>
			<Form.Item
				name={"r_password"}
				rules={[
					{
						required: true,
						message: "Вы не ввели повтор пароля",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("Пароли не совпадают");
						},
					}),
				]}
				hasFeedback={true}
			>
				<Input.Password size="large" placeholder="Повтор пароля" />
			</Form.Item>
			<Form.Item>
				<Button block htmlType="submit" type="primary" size="larger">
					Зарегистрироваться
				</Button>
			</Form.Item>
			<NavLink className={"auth__link"} to={"/signin"}>
				Уже есть аккаунт
			</NavLink>
		</Form>
	);
};

export default LoginForm;
