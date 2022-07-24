import React from "react";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import "./Message.scss";
import classNames from "classnames";

const Message = ({ account, text, files, createdAt, isMe }) => {
	return (
		<div className={classNames("message", { "message__self": isMe })}>
			<div className="message__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</div>
			<div className="message__content">
				<div>
					<p className="message__text">{text}</p>
					<div className="message__attachments">{files}</div>
				</div>
				<span className="message__date">
					{formatDistanceToNow(new Date(createdAt), {
						addSuffix: true,
						locale: ruLocale,
					})}
				</span>
			</div>
		</div>
	);
};

export default Message;
