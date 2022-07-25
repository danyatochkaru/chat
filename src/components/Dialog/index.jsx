import { formatDistanceToNow, formatRelative } from "date-fns/esm";
import React from "react";
import { ReactComponent as ReadedIcon } from "../Message/check.svg";
import ruLocale from "date-fns/locale/ru";
import "./Dialog.scss";

const Dialog = ({ account, text, attachments, createdAt, isMe, isReaded }) => {
	return (
		<div className="dialog">
			<div className="dialog__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</div>
			<div className="dialog__info">
				<h3 className="dialog__username">{account?.username}</h3>
				<p className="dialog__last_message">
					{isMe && "Вы: "}
					{text && <span>{text}</span>}{" "}
					{attachments?.length > 0 && <i>({attachments?.length} медиа)</i>}
				</p>
			</div>
			{isReaded && (
				<span>
					<ReadedIcon className="view_indicator" />
				</span>
			)}
			<time>
				{new Date(createdAt) >= new Date(Date.now() + 1000 * 60 * 60)
					? formatDistanceToNow(new Date(createdAt), {
							addSuffix: true,
							locale: ruLocale,
					  })
					: formatRelative(new Date(createdAt), new Date(), {
							addSuffix: true,
							locale: ruLocale,
					  })}
			</time>
		</div>
	);
};

export default Dialog;
