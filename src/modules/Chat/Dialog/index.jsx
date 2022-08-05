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
	const { selected } = useSelector((store) => store.chat);
	const { items } = useSelector((state) => state.session);
	const message = useSelector((state) => state.message);
	const { fetchMessagesByChatId } = useAction();
	const [searchParams] = useSearchParams();
	const isTyping = Date.now() % 2 === 0;

	React.useEffect(() => {
		if (searchParams.has("id")) fetchMessagesByChatId(searchParams.get("id"));
	}, [searchParams.get("id")]);

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
											: `/dialogs`
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
										: `/dialogs`
								}
							>
								<h3 className="dialog__header-title">
									{selected?.account?.username}
								</h3>
							</Link>
						</span>
						<Button
							type="text"
							shape="circle"
							icon={<MenuIcon className="more__btn" />}
						/>
					</div>
					<div className="dialog__messages">
						{message.loading ? (
							<Spin
								indicator={<LoadingOutlined spin />}
								className="dialog__center"
								size="large"
								tip="Загрузка сообщений..."
							/>
						) : (
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
