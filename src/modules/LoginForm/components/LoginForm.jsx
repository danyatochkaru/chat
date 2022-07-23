import React from "react";
import { Input, Form } from "antd";
import { NavLink } from "react-router-dom";
import { Button } from "components";

const LoginForm = () => {
    const [form] = Form.useForm();
    
	return (
		<Form name="auth" form={form}>
			<Form.Item
				name={"email"}
				rules={[
					{
						required: true,
						message: "Вы не ввели почту",
					},
				]}
			>
				<Input size="large" placeholder="Почта" />
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
			<Form.Item>
				<Button block htmlType="submit" type="primary" size="larger">
					Войти в аккаунт
				</Button>
			</Form.Item>
			<NavLink className={"auth__link"} to={"#"}>
				Зарегистрироваться
			</NavLink>
		</Form>
	);
};

export default LoginForm;
