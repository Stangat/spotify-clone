import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCategory } from "../../../api/api";
import { CardItem } from "../CardItem/CardItem";

type SingleCategoryProps = {
  token: string;
  id?: string;
};

export const CategoryContent: FC<SingleCategoryProps> = props => {
  const {id} = useParams();
  const token = props.token;

  const [albums, setAlbums] = useState<SpotifyApi.CategoryPlaylistsResponse>();

  const getAlbumsOfCategory = async () => {
    const response = await getSingleCategory({token, id});
    setAlbums(response);
  };

  console.log(albums?.playlists);

  useEffect(() => {
    getAlbumsOfCategory();
  }, []);
  
  return (<div>
    {albums && albums.playlists.items.map(album => {
          return <div></div>;//<CardItem key={album.id} album={album}/>;
        })}
  </div>);
};
