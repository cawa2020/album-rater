import React, { useEffect, useState } from "react";
import "./Card.css";
import Song from "../Song/Song";
import { getAlbumById } from "../../services/api";
import html2canvas from "html2canvas";

export default function Card({ albumId }) {
	const [album, setAlbum] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [disabledTracksId, setDisabledTracksId] = useState([]);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		async function initAlbum() {
			const album = await getAlbumById(albumId);
			setAlbum(album);
			setTracks(album.tracks.data);
		}

		initAlbum();
	}, []);

	function toggleDisable(songId) {
		if (disabledTracksId.includes(songId)) {
			setDisabledTracksId(disabledTracksId.filter((id) => id !== songId));
		} else {
			setDisabledTracksId([...disabledTracksId, songId]);
		}
	}

	function getIsDisabled(songId) {
		console.log(disabledTracksId.some((id) => id === songId));
		return disabledTracksId.some((id) => id === songId);
	}

	function downloadImage() {
		html2canvas(document.getElementById(album.id)).then(function (canvas) {
			const image = canvas.toDataURL("image/png");
			canvas.style.borderRadius = 6;
			const link = document.createElement("a");
			link.download = `${album.title} — ${album.artist.name}.png`;
			link.href = image;
			link.click();
		});
	}

	function getTracksWithNoDisabled() {
		return tracks.filter((song) => !disabledTracksId.includes(song.id));
	}

	return (
		<>
			{album ? (
				<div>
					<div className="card" id={album.id}>
						<img className="card-header__blur-img" src={album.cover_big} alt="album.cover_big" />
						<div className="card-header">
							<img className="card-header__img" src={album.cover_big} alt="album.cover_big" />
							<h1 className="card-header__album">{album.title}</h1>
							<h2 className="card-header__artist">{album.artist.name}</h2>
						</div>
						<div className="card-song-container">
							{(isEditing ? tracks : getTracksWithNoDisabled()).map((song, index) => (
								<Song key={song.id} toggleDisable={toggleDisable} isDisabled={getIsDisabled(song.id)} isEditing={isEditing} song={song} indexProp={index} />
							))}
							{/* {tracks.map((song, index) =>
								!isEditing && disabledTracksId.includes(song.id) ? null : (
									<Song key={song.id} toggleDisable={toggleDisable} isDisabled={getIsDisabled(song.id)} isEditing={isEditing} song={song} indexProp={index} />
								)
							)} */}
						</div>
					</div>
					<div className="mt-4 space-x-2">
						<button onClick={downloadImage} className="button">
							скачать
						</button>
						<button onClick={() => setIsEditing(!isEditing)} className="button">
							режим {isEditing ? "просмотр" : "редактирование"}
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}
