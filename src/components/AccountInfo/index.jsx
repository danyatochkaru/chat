import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./AccountInfo.scss";
import { Avatar } from "components";
import { useAction } from "hooks";

export default function AccountInfo({ account, showSettingsWindow }) {
	const { logout } = useAction();

	return account?.id ? (
		<section className="settings_btn">
			<Divider plain>
				<span className="settings_btn__account">
					<Link to={account.id ? `/profile/${account.id}` : `/chats`}>
						<div className="settings_btn__account-avatar">
							<Avatar account={account} />
						</div>
						<h3 className="settings_btn__account-title">{account.username}</h3>
					</Link>
				</span>
			</Divider>
			<Button
				icon={<SettingOutlined />}
				type="text"
				block
				className="settings_btn__button"
				onClick={showSettingsWindow}
			>
				Настройки
			</Button>
			<Button
				icon={<LogoutOutlined />}
				type="text"
				block
				danger
				className="settings_btn__button"
				onClick={logout}
			>
				Выйти
			</Button>
		</section>
	) : (
		<></>
	);
}
