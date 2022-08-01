import React from "react";

import "./Preloader.scss";
import { LoadingOutlined } from "@ant-design/icons";

const Preloader = () => {
	return (
		<div className="preloader__wrapper">
			<LoadingOutlined />
		</div>
	);
};

export default Preloader;
