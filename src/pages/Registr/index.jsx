import React from "react";
import "./Registr.scss";
import { AuthLayout, Registr as RegistrForm } from "modules";

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
