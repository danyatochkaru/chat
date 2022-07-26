import React from "react";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import "./Message.scss";
import classNames from "classnames";
import { ReactComponent as MenuIcon } from "./menu-dots.svg";
import { ReactComponent as ReadedIcon } from "./readed.svg";
import { ReactComponent as SentIcon } from "./sent.svg";
import { ReactComponent as ErrorSentIcon } from "./sending-error.svg";
import { NavLink } from "react-router-dom";

const Message = ({
	account,
	text,
	attachments,
	createdAt,
	isMe,
	isReaded,
	hasError,
}) => {
	return (
		<div className={classNames("message", { "message__self": isMe })}>
			<NavLink to={`/profile/${account?.id}`} className="message__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</NavLink>
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
					{hasError ? (
						<ErrorSentIcon
							className="view_indicator view_indicator-error"
							title={"Ошибка при отправке"}
						/>
					) : (
						isMe &&
						(isReaded ? (
							<ReadedIcon
								className="view_indicator view_indicator-readed"
								title={"Просмотрено"}
							/>
						) : (
							<SentIcon className="view_indicator" title={"Отправлено"} />
						))
					)}
					<MenuIcon className="more__btn" />
				</span>
			</div>
		</div>
	);
};

export default Message;
