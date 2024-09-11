import Card from "./components/Card/Card";
import React, { useEffect, useState } from "react";
import { getSongsBySearch } from "./services/api";
import Header from "./components/Header/Header";

function App() {
  const [albumsId, setAlbumsId] = useState([])
  useEffect(() => {
    async function initIds() {
      const res = await getSongsBySearch("кишлак эскпасит");
      const albumId = res.data[0].album.id;
      setAlbumsId([albumId])
    }

    initIds();
  }, []);

  return (
    <>
      <Header />
      {albumsId.map((id) => <Card key={id} albumId={id} />)}
    </>
  );
}

export default App;
