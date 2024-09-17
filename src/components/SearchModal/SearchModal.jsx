import React, { useState } from "react";
import { getSongsBySearch } from "../../services/api";
import Loader from "../Loader/Loader";
import "./SearchModal.css";

export default function SearchModal({ toggleModal, addAlbum }) {
	const [search, setSearch] = useState("");
	const [findedAlbums, setFindedAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function findBySearch(e) {
		if (isLoading) return;
		e.preventDefault();
		setFindedAlbums([]);
		setIsLoading(true);
		const res = await getSongsBySearch(search);
		const filteredAlbums = res.data.filter((item, index, array) => array.findIndex((el) => el.album.id === item.album.id) === index);
		setFindedAlbums(filteredAlbums);
		setIsLoading(false);
	}

	return (
		<>
			<div className="modal-container" onClick={() => toggleModal()}></div>
			<div className="modal-content">
				<form onSubmit={(e) => findBySearch(e)} className="pseudo-input">
					<button onClick={(e) => findBySearch(e)}>
						<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.6545 16.0307C18.1921 14.4622 19.1402 12.3137 19.1402 9.9437C19.1402 5.14122 15.2471 1.24805 10.4446 1.24805C5.64211 1.24805 1.74893 5.14122 1.74893 9.9437C1.74893 14.7462 5.64211 18.6394 10.4446 18.6394C12.8771 18.6394 15.0763 17.6405 16.6545 16.0307ZM16.6545 16.0307L21.7489 21.248"
								stroke="#000"
								stroke-width="2.02054"
								stroke-linecap="round"
							/>
						</svg>
					</button>
					<input
						type="text"
						placeholder="Найдется любой альбом!"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</form>

				<div className="mt-6 w-full flex justify-center">
					{findedAlbums.length ? (
						<div className="grid gap-6 grid-cols-3">
							{findedAlbums.map((item) => (
								<div className="cursor-pointer relative text-center album-brief" onClick={() => addAlbum(item.album.id)}>
									<img className="rounded-md album-cover" src={item.album.cover_medium} alt="" />
									<h3 className="text-base z-[1000] font-medium absolute text-white bottom-3 left-0 right-0 mx-4 two-rows-text">{item.album.title}</h3>
								</div>
							))}
						</div>
					) : isLoading ? (
						<Loader />
					) : (
						<span>пусто.... :(</span>
					)}
				</div>
			</div>
		</>
	);
}
