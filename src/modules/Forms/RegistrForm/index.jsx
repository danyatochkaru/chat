import React from "react";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import classNames from "classnames";
import { useFormik } from "formik";

import { Button } from "components";
import { useAction } from "hooks";

const RegistrForm = () => {
	const { registration } = useAction();

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(3, "Минимум 3 символа")
			.max(20, "Максимум 20 символов")
			.required("Вы не ввели отображаемое имя"),
		email: Yup.string()
			.email("Некорректная почта")
			.required("Вы не ввели почту"),
		password: Yup.string()
			.min(5, "Минимум 5 символов")
			.max(20, "Не более 20 символов")
			.required("Вы не ввели пароль"),
		r_password: Yup.string()
			.required("Вы не ввели повтор пароля")
			.oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			r_password: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			alert(JSON.stringify(values, null, 2));
			await registration(values);
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
			<Input
				size="large"
				placeholder="Отображаемое имя"
				name="username"
				onChange={formik.handleChange}
				value={formik.values.username}
				status={
					formik.errors.username && formik.touched.username ? "error" : null
				}
			/>
			<div
				className={classNames("error", {
					"error--active": formik.errors.username && formik.touched.username,
				})}
			>
				{formik.errors.username && formik.touched.username
					? formik.errors.username
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
			<Input.Password
				size="large"
				placeholder="Пароль"
				name="r_password"
				onChange={formik.handleChange}
				value={formik.values.r_password}
				status={
					formik.errors.r_password && formik.touched.r_password ? "error" : null
				}
			/>
			<div
				className={classNames("error", {
					"error--active":
						formik.errors.r_password && formik.touched.r_password,
				})}
			>
				{formik.errors.r_password && formik.touched.r_password
					? formik.errors.r_password
					: null}
			</div>
			<Button block htmlType="submit" type="primary" size="larger">
				Зарегистрироваться
			</Button>
			<NavLink className={"auth__link"} to={"/signin"}>
				Уже есть аккаунт
			</NavLink>
		</form>
	);
};

export default RegistrForm;
