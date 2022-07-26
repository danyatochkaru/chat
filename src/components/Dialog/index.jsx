import { format, formatRelative, isToday, isYesterday } from "date-fns/esm";
import React from "react";
import { ReactComponent as ReadedIcon } from "../Message/readed.svg";
import { ReactComponent as ErrorSentIcon } from "../Message/sending-error.svg";
import { ReactComponent as SentIcon } from "../Message/sent.svg";
import ruLocale from "date-fns/locale/ru";
import "./Dialog.scss";
import classNames from "classnames";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";

const Dialog = ({
	account,
	text,
	attachments,
	createdAt,
	isMe,
	isReaded,
	hasError,
	isActive,
	unReaded,
}) => {
	return (
		<NavLink
			to={`/dialogs/${account?.id}`}
			className={classNames("dialog", { "dialog-active": isActive })}
		>
			<div className="dialog__avatar">
				<NavLink to={`/profile/${account?.id}`}>
					<Badge dot={account?.online} color="green" offset={[-6, 34]}>
						<img src={account?.image_path} alt={account?.username} />
					</Badge>
				</NavLink>
			</div>
			<div className="dialog__content">
				<div className="dialog__info">
					<p className="dialog__username">{account?.username}</p>
					<span>
						{hasError ? (
							<ErrorSentIcon
								className="view_indicator view_indicator-error"
								title={"Ошибка при отправке"}
							/>
						) : isMe ? (
							isReaded ? (
								<ReadedIcon
									className="view_indicator view_indicator-readed"
									title={"Просмотрено"}
								/>
							) : (
								<SentIcon className="view_indicator" title={"Отправлено"} />
							)
						) : (
							<Badge count={unReaded} />
						)}
						<time
							title={format(new Date(createdAt), "PPPPpppp", {
								locale: ruLocale,
							})}
						>
							{isYesterday(new Date(createdAt))
								? formatRelative(new Date(createdAt), new Date(), {
										addSuffix: true,
										locale: ruLocale,
								  })
								: format(
										new Date(createdAt),
										isToday(new Date(createdAt)) ? "p" : "P",
										{ locale: ruLocale },
								  )}
						</time>
					</span>
				</div>
				<span className="dialog__last_message">
					{isMe && <span>Вы:</span>}
					{text && <span>{text}</span>}
					{attachments?.length > 0 && <i>({attachments?.length} медиа)</i>}
				</span>
			</div>
		</NavLink>
	);
};

export default Dialog;
