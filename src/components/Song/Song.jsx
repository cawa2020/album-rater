import React, { useEffect, useState } from "react";
import "./Song.css";

export default function Song({ indexProp, song, toggleDisable, isDisabled, isEditing }) {
	const [stars, setStars] = useState(0);

	useEffect(() => {
		if (isDisabled) {
			setStars(0);
		}
	}, [isDisabled]);

	function convertDuration(duration) {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		const convertedSeconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
		return `${minutes}:${convertedSeconds}`;
	}

	function changeStars(newValue) {
		// if (!isEditing) return;
		if (newValue === stars) {
			setStars(0);
		} else {
			setStars(newValue);
		}
	}

	return (
		<div className={isDisabled ? "song disabled" : "song"}>
			<span className="song-index">{indexProp + 1}</span>
			<h3 className="song-title">{song.title}</h3>
			<div className="flex gap-1">
				{[1, 1, 1].map((el, index) => (
					<button disabled={!isEditing} key={index} onClick={() => changeStars(index + 1)}>
						<svg width="23" height="21" viewBox="0 0 23 21" fill={stars > index ? "#EDDC35" : "none"} xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.5806 2.39794C10.9266 1.5889 12.0734 1.5889 12.4194 2.39794L14.361 6.93787C14.5057 7.27607 14.8243 7.50756 15.1906 7.54061L20.1084 7.98426C20.9847 8.06332 21.3391 9.15407 20.6766 9.73315L16.9589 12.9826C16.6819 13.2247 16.5602 13.5993 16.642 13.9579L17.7397 18.772C17.9353 19.6299 17.0075 20.304 16.252 19.8529L12.0127 17.3212C11.6969 17.1326 11.3031 17.1326 10.9873 17.3212L6.74799 19.8529C5.99253 20.304 5.06468 19.6299 5.2603 18.772L6.35802 13.9579C6.43979 13.5993 6.31809 13.2247 6.04114 12.9826L2.3234 9.73315C1.66087 9.15407 2.01528 8.06332 2.89164 7.98426L7.80936 7.54061C8.1757 7.50756 8.49432 7.27607 8.63896 6.93787L10.5806 2.39794Z"
								stroke={stars > index ? "#EDDC35" : "#898989"}
								stroke-width="2"
							/>
						</svg>
					</button>
				))}
			</div>

			<span className="song-duration">{convertDuration(song.duration)}</span>

			{isEditing && (
				<button onClick={() => toggleDisable(song.id)}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.4298 4.07812L9.37844 9.12948M4.32709 14.1808L9.37844 9.12948M9.37844 9.12948L4.32709 4.07812M9.37844 9.12948L14.4298 14.1808"
							stroke="#898989"
							stroke-width="2.02054"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
