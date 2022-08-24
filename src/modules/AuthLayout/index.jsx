import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "components";
import { useAction } from "../../hooks";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const AuthForm = ({ title, description, children }) => {
	const session = useSelector((state) => state.session);
	const navigate = useNavigate();
	const { fetchSession } = useAction();

	React.useEffect(() => {
		if (session.items) {
			return navigate("/");
		}
	}, [session]);

	React.useEffect(() => {
		fetchSession();
	}, []);

	if (session.loading)
		return (
			<section className="auth">
				<div className="auth__content">
					<Spin
						indicator={<LoadingOutlined spin />}
						size="large"
						tip="Получение данных о сессии..."
					/>
					{/* <LoadingOutlined size="large" spin /> */}
				</div>
			</section>
		);

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
