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
						min: 2,
						message: "Минимум 2 символa",
					},
				]}
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
					{
						min: 5,
						message: "Минимум 5 символов",
					},
				]}
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
