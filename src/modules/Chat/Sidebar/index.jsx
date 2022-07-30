import React from "react";
import "./Sidebar.scss";
import { FormOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Empty, Input } from "antd";

import { Dialog } from "components";

const Sidebar = ({ dialogs, id, isSearch }) => {
	return (
		<section className="sidebar">
			<header className="sidebar__header">
				<span>
					<TeamOutlined />
					<h4 className="sidebar__title">Список диалогов</h4>
				</span>
				<Button type="text" shape="circle" icon={<FormOutlined />} />
			</header>
			<div className="sidebar__search">
				<Input
					className="sidebar__search-input"
					placeholder="Поиск среди контактов"
					prefix={<SearchOutlined />}
					allowClear
					bordered={false}
				/>
			</div>
			<div className="sidebar__dialogs_list">
				{isSearch ? (
					dialogs.length ? (
						dialogs.map((d) => (
							<Dialog
								account={d.account}
								text={d.text}
								attachments={d.attachments}
								createdAt={d.createdAt}
								isMe={d.isMe}
								isReaded={d.isReaded}
								hasError={d.hasError}
								isActive={d.account.id === Number(id)}
								unread={d.unread}
							/>
						))
					) : (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description="Поиск завершился пустым результатом"
						/>
					)
				) : (
					<>
						<Dialog
							account={{
								username: "Общий чат",
							}}
							text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab aperiam eius veritatis ex. Obcaecati laudantium vitae adipisci odio corrupti nisi, totam nobis eos excepturi quasi necessitatibus architecto fugiat velit eius!"
							createdAt={new Date("2022-07-24 21:44:01")}
							isActive={isNaN(id)}
							unReaded={13}
						/>
						{dialogs.map((d) => (
							<Dialog
								account={d.account}
								text={d.text}
								attachments={d.attachments}
								createdAt={d.createdAt}
								isMe={d.isMe}
								isReaded={d.isReaded}
								hasError={d.hasError}
								isActive={d.account.id === Number(id)}
								unread={d.unread}
							/>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default Sidebar;
