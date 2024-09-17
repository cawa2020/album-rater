import Card from "./components/Card/Card";
import React, { useEffect, useState } from "react";
import { getSongsBySearch } from "./services/api";
import Header from "./components/Header/Header";

function App() {
  const [albumsId, setAlbumsId] = useState([])

  useEffect(() => {
    async function initIds() {
      const res = await getSongsBySearch("boywithiuke");
      const albumId = res.data[0].album.id;
      setAlbumsId([albumId])
    }

    initIds();
  }, []);

  function addAlbum(id) {
    setAlbumsId([...albumsId, id])
  }

  return (
    <>
      <Header addAlbum={addAlbum} />
      <div className="flex flex-wrap gap-8">
        {albumsId.map((id) => <Card key={id} albumId={id} />)}
      </div>
    </>
  );
}

export default App;
