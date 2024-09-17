import React, { useState } from "react";
import SearchModal from "../SearchModal/SearchModal";
import "./Header.css";

export default function Header({ addAlbum }) {
	const [isModalOpen, setModal] = useState(false);

	function toggleModal() {
		setModal((prev) => !prev);
	}

	return (
		<>
			{isModalOpen && <SearchModal isModalOpen={isModalOpen} addAlbum={addAlbum} toggleModal={toggleModal} />}
			<header>
				<button className="flex gap-2 items-center button" onClick={toggleModal}>
					<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.6545 16.0307C18.1921 14.4622 19.1402 12.3137 19.1402 9.9437C19.1402 5.14122 15.2471 1.24805 10.4446 1.24805C5.64211 1.24805 1.74893 5.14122 1.74893 9.9437C1.74893 14.7462 5.64211 18.6394 10.4446 18.6394C12.8771 18.6394 15.0763 17.6405 16.6545 16.0307ZM16.6545 16.0307L21.7489 21.248"
							stroke="rgb(229 231 235)"
							stroke-width="2.02054"
							stroke-linecap="round"
						/>
					</svg>
					<span>Search</span>
				</button>
				<button className="button">
					Export
				</button>
			</header>
		</>
	);
}
