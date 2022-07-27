import React from "react";
import Avatar from "antd/lib/avatar";

const AvatarComponent = ({ account, ...props }) => {
	const userColors = [
		"#f97d64",
		"#41a8bf",
		"#395492",
		"#1e5a84",
		"#935c95",
		"#50acda",
		"#d86a65",
		"#a044c1",
		"#e6ca3d",
		"#727b7e",
	];
	return (
		<Avatar
			title={account?.username}
			src={account?.image_path}
			style={
				!account?.image_path && {
					backgroundColor: userColors[Math.floor(account.id % 10)],
				}
			}
			{...props}
		>
			{account?.username[0]}
		</Avatar>
	);
};

export default AvatarComponent;
