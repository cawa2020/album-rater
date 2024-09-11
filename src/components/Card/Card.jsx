import React, { useEffect, useState } from "react";
import "./Card.css";
import Song from "../Song/Song";
import { getAlbumById } from "../../services/api";

export default function Card({ albumId }) {
	const [album, setAlbum] = useState(null);
	const [tracks, setTracks] = useState([]);
	const [disabledTracksId, setDisabledTracksId] = useState([]);

	useEffect(() => {
		async function initAlbum() {
			const album = await getAlbumById(albumId);
			setAlbum(album);
			setTracks(album.tracks.data);
		}

		initAlbum();
	}, []);

	function toggleDisable(index) {
		if (disabledTracksId.includes(index)) {
			setDisabledTracksId(disabledTracksId.filter(id => id !== index))
		} else {
			setDisabledTracksId([...disabledTracksId, index]);
		}
	}

	function getIsDisabled(index) {
		return disabledTracksId.some((id) => id === index);
	}

	return (
		<>
			{album ? (
				<div className="card">
					<img className="card-header__blur-img" src={album.cover_big} alt="" />
					<div className="card-header">
						<img className="card-header__img" src={album.cover_big} alt="" />
						<h1 className="card-header__album">{album.title}</h1>
						<h2 className="card-header__artist">{album.artist.name}</h2>
					</div>
					<div className="card-song-container">
						{tracks.map((song, index) => (
							<Song key={index} toggleDisable={toggleDisable} isDisabled={getIsDisabled(index)} song={song} index={index} />
						))}
					</div>
				</div>
			) : null}
		</>
	);
}
