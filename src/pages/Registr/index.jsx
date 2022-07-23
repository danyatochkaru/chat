import React from "react";
import { AuthLayout, RegistrForm } from "modules";
import "./Auth.scss";

const Registr = () => {
	return (
		<AuthLayout
			title="Регистрация"
			description="Для регистрациии заполните все поля"
		>
			<RegistrForm />
		</AuthLayout>
	);
};

export default Registr;
