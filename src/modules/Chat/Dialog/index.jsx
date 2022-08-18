import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge, Button, Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./Dialog.scss";

import { Message, AudioMessage, Typing, Avatar, ChatInput } from "components";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";
import { useAction } from "../../../hooks";

const Dialog = () => {
	const messagesRef = React.useRef();
	const { selected } = useSelector((store) => store.chat);
	const { items } = useSelector((state) => state.session);
	const message = useSelector((state) => state.message);
	const { fetchMessagesByChatId } = useAction();
	const [searchParams] = useSearchParams();
	const isTyping = Date.now() % 2 === 0;

	React.useEffect(() => {
		if (searchParams.has("id")) fetchMessagesByChatId(searchParams.get("id"));
	}, [searchParams.get("id")]);

	const goToBottom = () => {
		messagesRef.current?.addEventListener("DOMNodeInserted", (event) => {
			const { currentTarget: target } = event;
			target.scroll({ top: target.scrollHeight });
		});
	};

	React.useEffect(() => {
		goToBottom();
	});

	return (
		<section className="dialog">
			{selected ? (
				<>
					<div className="dialog__header">
						<div />
						<span>
							<div className="dialog__header-avatar">
								<Link
									to={
										selected?.accounts.find((a) => a.id !== items.id)?.id
											? `/profile/${
													selected?.accounts.find((a) => a.id !== items.id)?.id
											  }`
											: `/chats`
									}
								>
									<Badge
										dot={
											selected?.accounts.find((a) => a.id !== items.id)?.online
										}
										color="green"
										offset={[-4, 28]}
									>
										<Avatar
											account={selected?.accounts.find(
												(a) => a.id !== items?.id,
											)}
										/>
									</Badge>
								</Link>
							</div>
							<Link
								to={
									selected?.accounts.find((a) => a.id !== items.id)?.id
										? `/profile/${
												selected?.accounts.find((a) => a.id !== items.id)?.id
										  }`
										: `/chats`
								}
							>
								<h3 className="dialog__header-title">
									{selected?.accounts.find((a) => a.id !== items.id)?.username}
								</h3>
							</Link>
						</span>
						<Button
							type="text"
							shape="circle"
							icon={<MenuIcon className="more__btn" />}
						/>
					</div>
					<div className="dialog__messages" ref={messagesRef}>
						{message.loading ? (
							<Spin
								indicator={<LoadingOutlined spin />}
								className="dialog__center"
								size="large"
								tip="Загрузка сообщений..."
							/>
						) : message.items.length ? (
							<>
								{message.items?.map((m) => {
									if (m.type === "simple")
										return (
											<Message
												// {...m}
												key={m.id}
												account={m.accounts[0]}
												text={m.text}
												unread={m.unread}
												createdAt={m.createdAt}
												isMe={m.accountId === items?.id}
												hasError={false}
												attachments={m.attachments}
											/>
										);
									if (m.type === "audio")
										return (
											<AudioMessage
												key={m.id}
												{...m}
												isMe={m.accountId === items?.id}
											/>
										);
								})}
								{selected?.id && isTyping && (
									<Typing
										accounts={[
											selected?.accounts.find((a) => a.id !== items.id),
										]}
									/>
								)}
							</>
						) : (
							<Empty
								className="dialog__center"
								description={"В этом чате нет сообщений :("}
							/>
						)}
					</div>
					<ChatInput disabled={message.loading} />
				</>
			) : (
				<Empty className="dialog__center" description={"Выберите чат"} />
			)}
		</section>
	);
};

export default Dialog;
