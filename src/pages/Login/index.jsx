import React from "react";
import { Login as LoginForm, AuthLayout } from "modules";
import "./Auth.scss";

const Login = () => {
	return (
		<AuthLayout
			title="Авторизация"
			description="Пожалуйста, войдите в свой аккаунт"
		>
			<LoginForm />
		</AuthLayout>
	);
};

export default Login;
