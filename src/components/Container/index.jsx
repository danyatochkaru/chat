import React from "react";
import "./Container.scss";
import classNames from "classnames";

const Container = (props) => (
	<div className={classNames("container", props.className)}>{props.children}</div>
);

export default Container;
