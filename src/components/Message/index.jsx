import React from "react";
import { formatDistanceToNow } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import "./Message.scss";
import classNames from "classnames";
import { ReactComponent as CheckedIcon } from "./check.svg";
import { ReactComponent as MenuIcon } from "./menu-dots.svg";

const Message = ({ account, text, attachments, createdAt, isMe, isReaded }) => {
	return (
		<div className={classNames("message", { "message__self": isMe })}>
			<div className="message__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</div>
			<div className="message__content">
				{attachments?.length && (
					<div className="message__attachments">
						{attachments?.length > 0 &&
							attachments.map((item) => {
								switch (item.file_type) {
									case "image": {
										return (
											<img
												data-url={item.file_url}
												key={item.id}
												src={item.file_url}
												alt={item.file_name}
											/>
										);
									}
									default:
										return <></>;
								}
							})}
					</div>
				)}
				{text && (
					<div className="message__wrapper">
						<p className="message__text">{text}</p>
					</div>
				)}
				<span className="message__info">
					<time title={`Отправлено: ${new Date(createdAt).toLocaleString()}`}>
						{formatDistanceToNow(new Date(createdAt), {
							addSuffix: true,
							locale: ruLocale,
						})}
					</time>
					{isMe && isReaded && (
						<CheckedIcon className="view_indicator" title={"Просмотрено"} />
					)}
					<MenuIcon className="more__btn" />
				</span>
			</div>
		</div>
	);
};

export default Message;
