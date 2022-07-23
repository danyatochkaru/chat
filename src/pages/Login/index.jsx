import React from "react";
import { LoginForm, AuthLayout } from "modules";
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
