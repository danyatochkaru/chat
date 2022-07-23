import React from "react";
import "./Block.scss";
import classNames from "classnames";

const Block = (props) => (
	<div className={classNames("block", props.className)}>{props.children}</div>
);

export default Block;
