import { format, formatRelative, isToday, isYesterday } from "date-fns/esm";
import React from "react";
import { ReactComponent as ReadedIcon } from "assets/readed.svg";
import { ReactComponent as ErrorSentIcon } from "assets/sending-error.svg";
import { ReactComponent as SentIcon } from "assets/sent.svg";
import ruLocale from "date-fns/locale/ru";
import "./Dialog.scss";
import classNames from "classnames";
import Badge from "antd/lib/badge";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Avatar } from "components";

const Dialog = ({
	id,
	account,
	message,
	unread_count,
	isMe,
	hasError,
	isActive,
}) => {
	const [search, setSearch] = useSearchParams();

	const navigate = useNavigate();

	return (
		<div
			className={classNames("dialog_item", {
				"dialog_item--active": isActive,
			})}
			onClick={() => {
				// search.set("id", id);
				// setSearch(search);
				navigate("/chats/" + id);
			}}
		>
			<div className="dialog_item__avatar">
				<Badge dot={account?.online} color="green" offset={[-6, 34]}>
					<Avatar account={account} size={40} />
				</Badge>
			</div>
			<div className="dialog_item__content">
				<div className="dialog_item__info">
					<p className="dialog_item__username">{account?.username}</p>
					<span>
						{hasError ? (
							<ErrorSentIcon
								className="view_indicator view_indicator-error"
								title={"Ошибка при отправке"}
							/>
						) : isMe ? (
							message?.unread ? (
								<SentIcon className="view_indicator" title={"Отправлено"} />
							) : (
								<ReadedIcon
									className="view_indicator view_indicator-readed"
									title={"Просмотрено"}
								/>
							)
						) : (
							message?.unread && (
								<Badge
									count={unread_count}
									title={`Непрочитанных сообещний: ${unread_count}`}
								/>
							)
						)}
						{message?.createdAt && (
							<time
								title={format(new Date(message?.createdAt), "PPPPpppp", {
									locale: ruLocale,
								})}
							>
								{isYesterday(new Date(message?.createdAt))
									? formatRelative(new Date(message?.createdAt), new Date(), {
											addSuffix: true,
											locale: ruLocale,
									  })
									: format(
											new Date(message?.createdAt),
											isToday(new Date(message?.createdAt)) ? "p" : "P",
											{ locale: ruLocale },
									  )}
							</time>
						)}
					</span>
				</div>
				<span className="dialog_item__last_message">
					{isMe && <span>Вы:</span>}
					{message?.attachments?.length > 0 && (
						<i>({message?.attachments?.length} медиа)</i>
					)}
					{message?.text && <span>{message?.text}</span>}
				</span>
			</div>
		</div>
	);
};

export default Dialog;
