import React from "react";
import { Block } from "components";
import { LoginForm } from "modules";
import "./Auth.scss";

const Auth = () => {
	return (
		<section className="auth">
			<div className="auth__content">
				<header className="auth__header">
					<h2>Авторизация</h2>
					<p>Пожалуйста, войдите в свой аккаунт</p>
				</header>
				<Block>
					<LoginForm />
				</Block>
			</div>
		</section>
	);
};

export default Auth;
