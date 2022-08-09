import React from "react";
import { Link } from "react-router-dom";
import "./Typing.scss";
import Avatar from "antd/lib/avatar";
import { Avatar as AvatarComponent } from "components";

const Typing = ({ accounts }) => {
	return (
		<div className={"typing"}>
			<Avatar.Group maxCount={2}>
				{accounts.map((account) => {
					return (
						<Link
							key={account?.id}
							to={`/profile/${account?.id}`}
							className="typing__avatar"
						>
							<AvatarComponent account={account} />
						</Link>
					);
				})}
			</Avatar.Group>
			<div className="typing__content">
				<div className="typing__wrapper">
					<span className="circle bouncing"></span>
					<span className="circle bouncing"></span>
					<span className="circle bouncing"></span>
				</div>
			</div>
		</div>
	);
};

export default Typing;
