import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "components";
import { useAction } from "../../hooks";
import { Preloader } from "modules";

const AuthForm = ({ title, description, children }) => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();
	const { fetchSession } = useAction();

	React.useEffect(() => {
		if (session.session?.id) {
			return navigate("/");
		}
	}, [session]);

	React.useLayoutEffect(() => {
		fetchSession();
		console.log(session);
	}, []);

	if (session.loading) return <Preloader />;

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
