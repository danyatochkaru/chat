import React from "react";
import classNames from "classnames";
import "./AudioMessage.scss";
import { NavLink } from "react-router-dom";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import Waveform from "waveform-react";

import { ReactComponent as PlayIcon } from "./play.svg";
import { ReactComponent as PauseIcon } from "./pause.svg";
import { ReactComponent as MenuIcon } from "../Message/menu-dots.svg";
import { ReactComponent as ReadedIcon } from "../Message/readed.svg";
import { ReactComponent as SentIcon } from "../Message/sent.svg";
import { ReactComponent as ErrorSentIcon } from "../Message/sending-error.svg";

const AudioMessage = ({
	account,
	audio,
	createdAt,
	isMe,
	isReaded,
	hasError,
}) => {
	const [isPlay, setIsPlay] = React.useState(false);

	return (
		<div
			className={classNames("audio_message", { "audio_message__self": isMe })}
		>
			<NavLink to={`/profile/${account?.id}`} className="audio_message__avatar">
				<img src={account?.image_path} alt={account?.username} />
			</NavLink>
			<div className="audio_message__content">
				<div className="audio_message__wrapper">
					<button
						className="audio_message__icon"
						onClick={() => setIsPlay((isPlay) => !isPlay)}
					>
						{isPlay ? <PauseIcon /> : <PlayIcon />}
					</button>
					{audio && (
						<Waveform
							buffer={audio}
							markerStyle={{
								color: "#ffffff",
								width: 4,
							}}
							plot="bar"
							showPosition={true}
							height={30}
							width={100}
						/>
					)}
					<p
						className={classNames("audio_message__time", {
							"audio_message__time--playing": isPlay,
						})}
					>
						01:26
					</p>
				</div>
				<span className="audio_message__info">
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

export default AudioMessage;
