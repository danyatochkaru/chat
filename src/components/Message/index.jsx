import React from "react";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import "./Message.scss";
import classNames from "classnames";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";
import { ReactComponent as ReadedIcon } from "assets/readed.svg";
import { ReactComponent as SentIcon } from "assets/sent.svg";
import { ReactComponent as ErrorSentIcon } from "assets/sending-error.svg";
import { Link } from "react-router-dom";
import { Avatar } from "components";

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
			<Link to={`/profile/${account?.id}`} className="message__avatar">
				<Avatar account={account} />
			</Link>
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
