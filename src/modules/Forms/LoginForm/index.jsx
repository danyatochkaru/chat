import React from "react";
import { useFormik } from "formik";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import classNames from "classnames";

import { Button } from "components";
import { useAction } from "hooks";
import { useSelector } from "react-redux";

const LoginForm = () => {
	const { login } = useAction();
	const session = useSelector((state) => state.session);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Некорректная почта")
			.required("Вы не ввели почту"),
		password: Yup.string()
			.min(5, "Минимум 5 символов")
			.max(20, "Не более 20 символов")
			.required("Вы не ввели пароль"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			await login(values);
		},
	});

	return (
		<form name="login" onSubmit={formik.handleSubmit}>
			<Input
				size="large"
				placeholder="Почта"
				name="email"
				onChange={formik.handleChange}
				value={formik.values.email}
				status={formik.errors.email && formik.touched.email ? "error" : null}
			/>
			<div
				className={classNames("error", {
					"error--active": formik.errors.email && formik.touched.email,
				})}
			>
				{formik.errors.email && formik.touched.email
					? formik.errors.email
					: null}
			</div>
			<Input.Password
				size="large"
				placeholder="Пароль"
				name="password"
				onChange={formik.handleChange}
				value={formik.values.password}
				status={
					formik.errors.password && formik.touched.password ? "error" : null
				}
			/>
			<div
				className={classNames("error", {
					"error--active": formik.errors.password && formik.touched.password,
				})}
			>
				{formik.errors.password && formik.touched.password
					? formik.errors.password
					: null}
			</div>
			{session.error &&
				(!formik.touched?.email || !formik.touched?.password) && (
					<div className="error error--active">
						{session.error == "Invalid email or password"
							? "Неверная почта или пароль"
							: session.error}
					</div>
				)}
			<Button block htmlType="submit" type="primary" size="larger">
				Войти в аккаунт
			</Button>
			<NavLink className={"auth__link"} to={"/signup"}>
				Зарегистрироваться
			</NavLink>
		</form>
	);
};

export default LoginForm;
