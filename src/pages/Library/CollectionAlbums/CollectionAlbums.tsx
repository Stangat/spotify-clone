import { useEffect, useState } from "react";
import { getUserAlbumsSpotifyApi } from "../../../../api/api";
import { CardItem } from "../../../components/CardItem/CardItem";
import style from './collectionAlbums.module.less';

type CollectionAlbumsProps = {
  token: string;
};

export const CollectionAlbums: React.FC<CollectionAlbumsProps> = props => {
  const [userTopAlbums, setUserTopAlbums] = useState<SpotifyApi.UsersSavedAlbumsResponse>();

  const getTopAlbums = async () => {
    const response = await getUserAlbumsSpotifyApi(props.token);
    setUserTopAlbums(response);
  };

  useEffect(() => {
    getTopAlbums();
  }, []);

  return (
    <div className={style.wrapper}>
      <h1>Albums</h1>
      <div className={style.container}>
        {userTopAlbums?.items.map(e => <CardItem key={e.album.id} album={e.album}></CardItem>)}
      </div>
    </div>
  );
};
