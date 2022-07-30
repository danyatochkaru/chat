import React from "react";
import { AuthLayout, Registr as RegistrForm } from "modules";
import "./Registr.scss";

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
