import React from "react";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import "./Message.scss";
import classNames from "classnames";
import { ReactComponent as CheckedIcon } from "./check.svg";
import { ReactComponent as MenuIcon } from "./menu-dots.svg";
import { NavLink } from "react-router-dom";

const Message = ({
	account,
	text,
	attachments,
	createdAt,
	isMe,
	isReaded,
	isTyping,
}) => {
	return (
		<div className={classNames("message", { "message__self": isMe })}>
			<NavLink to={`/profile/${account?.id}`} className="message__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</NavLink>
			<div className="message__content">
				{isTyping && (
					<div className="message__wrapper message__wrapper__typing">
						<span className="circle bouncing"></span>
						<span className="circle bouncing"></span>
						<span className="circle bouncing"></span>
					</div>
				)}
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
					{createdAt && (
						<time
							title={`Отправлено: ${format(new Date(createdAt), "PPPPpppp", {
								locale: ruLocale,
							})}`}
						>
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
					)}
					{isMe && isReaded && (
						<CheckedIcon className="view_indicator" title={"Просмотрено"} />
					)}
					{!isTyping && <MenuIcon className="more__btn" />}
				</span>
			</div>
		</div>
	);
};

export default Message;
