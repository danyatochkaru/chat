import { format, formatRelative, isToday, isYesterday } from "date-fns/esm";
import React from "react";
import { ReactComponent as ReadedIcon } from "assets/readed.svg";
import { ReactComponent as ErrorSentIcon } from "assets/sending-error.svg";
import { ReactComponent as SentIcon } from "assets/sent.svg";
import ruLocale from "date-fns/locale/ru";
import "./Dialog.scss";
import classNames from "classnames";
import Badge from "antd/lib/badge";
import { Link } from "react-router-dom";
import { Avatar } from "components";

const Dialog = ({
	account,
	text,
	attachments,
	createdAt,
	isMe,
	isReaded,
	hasError,
	isActive,
	unread,
}) => {
	return (
		<div
			className={classNames("dialog_item", { "dialog_item-active": isActive })}
		>
			<div className="dialog_item__avatar">
				<Link to={account?.id ? `/profile/${account?.id}` : `/dialogs`}>
					<Badge dot={account?.online} color="green" offset={[-6, 34]}>
						<Avatar account={account} size={40} />
					</Badge>
				</Link>
			</div>
			<Link
				to={`/dialogs/${account?.id ?? ""}`}
				className="dialog_item__content"
			>
				<div className="dialog_item__info">
					<p className="dialog_item__username">{account?.username}</p>
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
							<Badge count={unread} title={`Непрочитанных сообещний: ${unread}`} />
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
				<span className="dialog_item__last_message">
					{isMe && <span>Вы:</span>}
					{text && <span>{text}</span>}
					{attachments?.length > 0 && <i>({attachments?.length} медиа)</i>}
				</span>
			</Link>
		</div>
	);
};

export default Dialog;
