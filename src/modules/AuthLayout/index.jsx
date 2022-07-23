import React from "react";
import { Container } from "components";

const AuthForm = ({ title, description, children }) => {
	return (
		<section className="auth">
			<div className="auth__content">
				<header className="auth__header">
					<h2>{title}</h2>
					<p>{description}</p>
				</header>
				<Container>{children}</Container>
			</div>
		</section>
	);
};

export default AuthForm;
