import React from "react";
import { NavLink } from "react-router-dom";
import "./Typing.scss";

const Typing = ({ accounts }) => {
	return (
		<div className={"typing"}>
			{accounts.map((account) => {
				return (
					<NavLink
						key={account.id}
						to={`/profile/${account?.id}`}
						className="typing__avatar"
					>
						<img src={account?.image_path} alt={account?.username} />
					</NavLink>
				);
			})}
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
