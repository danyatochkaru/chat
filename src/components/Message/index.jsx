import React from "react";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { Link } from "react-router-dom";
import { Button, Image, List, Popover } from "antd";
import classNames from "classnames";

import "./Message.scss";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";
import { ReactComponent as ReadedIcon } from "assets/readed.svg";
import { ReactComponent as SentIcon } from "assets/sent.svg";
import { ReactComponent as ErrorSentIcon } from "assets/sending-error.svg";
import { Avatar, MessageEdit } from "components";

const Message = ({
	id,
	account,
	text,
	unread,
	attachments,
	createdAt,
	isMe,
	hasError,
}) => {
	const [edit, setEdit] = React.useState({ type: "edit", visible: false });
	const [menuShow, setMenuShow] = React.useState(false)
	return (
		<div className={classNames("message", { "message--self": isMe })}>
			<Link to={`/profile/${account?.id}`} className="message__avatar">
				<Avatar account={account} />
			</Link>
			<div className="message__content">
				{!attachments?.length && (
					<div className="message__attachments">
						{attachments?.length > 0 &&
							attachments.map((item) => {
								switch (item.file_type) {
									case "image": {
										return (
											<Image
												key={item.id}
												src={item.file_url}
												alt={item.file_name}
												height="12rem"
											/>
										);
									}
									default:
										return <></>;
								}
							})}
						{/* <Image
							key={"oasdoibsa"}
							src={
								"http://mobimg.b-cdn.net/v3/fetch/2c/2c38ec7c72e3d0094f591d6f735a3b8e.jpeg"
							}
							alt={""}
							height="12rem"
						/> */}
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
						(!unread ? (
							<ReadedIcon
								className="view_indicator view_indicator-readed"
								title={"Просмотрено"}
							/>
						) : (
							<SentIcon className="view_indicator" title={"Отправлено"} />
						))
					)}
					<Popover
						content={
							<List
								size="small"
								split={false}
								dataSource={
									isMe
										? [
												{
													key: "change",
													title: "Изменить",
													onClick: () =>
														setEdit({ ...edit, type: "edit", visible: true }),
												},
												{
													key: "remove",
													title: "Удалить",
													danger: true,
													onClick: () =>
														setEdit({ ...edit, type: "delete", visible: true }),
												},
										  ]
										: [
												{ ket: "reply", title: "Ответить" },
												{
													key: "remove",
													title: "Удалить",
													danger: true,
													onClick: () =>
														setEdit({ ...edit, type: "delete", visible: true }),
												},
										  ]
								}
								renderItem={(item) => (
									<>
										<Button type="link" {...item}>
											{item.title}
										</Button>
										<br />
									</>
								)}
							/>
						}
						// trigger="click"
						placement={isMe ? "left" : "right"}
						arrowPointAtCenter
					>
						<MenuIcon className="more__btn" />
					</Popover>
				</span>
			</div>
			<MessageEdit
				text={text}
				id={id}
				type={edit.type}
				visible={edit.visible}
				hide={() => setEdit({ ...edit, visible: false })}
			/>
		</div>
	);
};

export default Message;
