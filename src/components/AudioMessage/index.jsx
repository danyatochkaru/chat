import React from "react";
import classNames from "classnames";
import "./AudioMessage.scss";
import { Link } from "react-router-dom";
import { format, formatDistanceToNow, formatRelative } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { ReactComponent as PlayIcon } from "assets/play.svg";
import { ReactComponent as PauseIcon } from "assets/pause.svg";
import { ReactComponent as MenuIcon } from "assets/menu-dots.svg";
import { ReactComponent as ReadedIcon } from "assets/readed.svg";
import { ReactComponent as SentIcon } from "assets/sent.svg";
import { ReactComponent as ErrorSentIcon } from "assets/sending-error.svg";
import { ReactComponent as LoadingIcon } from "assets/loading.svg";
import Slider from "antd/lib/slider";
import { Avatar } from "components";

const AudioMessage = ({
	account,
	audio,
	createdAt,
	isMe,
	isReaded,
	hasError,
}) => {
	const _audio = React.useRef(new Audio(audio.url));
	const [audioControl, setAudioControl] = React.useState({
		isLoading: false,
		isCanPlay: false,
		isPlay: false,
		progress: 0,
		duration: 0,
	});

	const toggleAudioPlay = () => {
		setAudioControl({ ...audioControl, isPlay: !audioControl.isPlay });
	};

	const changeAudioDuration = (val) => (_audio.current.currentTime = val / 100);

	React.useEffect(() => {
		audioControl.isPlay ? _audio.current.play() : _audio.current.pause();
	}, [audioControl.isPlay]);

	React.useEffect(() => {
		if (_audio.current.currentTime !== audioControl.progress)
			changeAudioDuration(_audio.current.currentTime * 100);
	}, [_audio.current?.currentTime]);

	return (
		<div
			className={classNames("audio_message", { "audio_message__self": isMe })}
		>
			<audio
				src={audio.url}
				ref={_audio}
				onLoadStart={() =>
					setAudioControl({
						...audioControl,
						isLoading: true,
					})
				}
				onLoadedData={() =>
					setAudioControl({
						...audioControl,
						duration: _audio.current.duration,
						isCanPlay: true,
						isLoading: false,
					})
				}
				onProgress={(e) => {
					// console.log(_audio.current.buffered.length, 
					// 	_audio.current.buffered.end(_audio.current.buffered.length - 1),
					// );
					setAudioControl({
						...audioControl,
						isLoading: true,
					});
				}}
				onLoadedMetadata={() =>
					setAudioControl({
						...audioControl,
						duration: _audio.current.duration,
						isCanPlay: true,
						isLoading: false,
					})
				}
				onEnded={() =>
					setAudioControl({ ...audioControl, isPlay: false, progress: 0 })
				}
				onTimeUpdate={() => {
					setAudioControl({
						...audioControl,
						progress: _audio.current.currentTime,
					});
				}}
			></audio>
			<Link to={`/profile/${account?.id}`} className="audio_message__avatar">
				<Avatar account={account} />
			</Link>
			<div className="audio_message__content">
				<div
					className={classNames("audio_message__wrapper", {
						"audio_message__wrapper--playing": audioControl.isPlay,
					})}
				>
					<button
						disabled={!audioControl.isCanPlay}
						className="audio_message__icon"
						onClick={toggleAudioPlay}
					>
						{audioControl.isLoading ? (
							<LoadingIcon
								className="audio_message__icon--loading"
								title={`Загружено: ${
									_audio.current.buffered.length &&
									(
										_audio.current.buffered.end(
											_audio.current.buffered.length - 1,
										) / _audio.current.duration * 100
									).toFixed(1)
								}%`}
							/>
						) : audioControl.isPlay ? (
							<PauseIcon />
						) : (
							<PlayIcon />
						)}
					</button>
					<Slider
						step={0.1}
						className="audio_message__slider"
						value={audioControl.progress * 100}
						min={0}
						max={audioControl.duration * 100}
						tipFormatter={null}
						onChange={changeAudioDuration}
						style={{
							width: `${Math.round(audioControl.duration * 2)}px`,
						}}
					/>
					<p className="audio_message__time">
						{Math.floor(audioControl.progress / 60)}:
						{("0" + Math.round(audioControl.progress % 60)).slice(-2)}/
						{Math.floor(audioControl.duration / 60)}:
						{("0" + Math.round(audioControl.duration % 60)).slice(-2)}
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
