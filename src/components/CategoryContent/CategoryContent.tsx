import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCategory } from "../../../api/api";
import { CardItem } from "../CardItem/CardItem";
import style from './categoryContent.module.less';

type SingleCategoryProps = {
  token: string;
  id?: string;
};

export const CategoryContent: FC<SingleCategoryProps> = props => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = props.token;

  const [playlists, setPlaylists] = useState<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>>();


  const getAlbumsOfCategory = async () => {
    const response = await getSingleCategory({token, id});
    setPlaylists(response);
  };

  useEffect(() => {
    getAlbumsOfCategory();
  }, []);
  
  return (<div className={style.wrapper}>
    {playlists && playlists.items.map(e => {
          return <CardItem key={e.id} album={e} onClick={() => {navigate(`/playlist/${e.id}`)}}/>;
        })}
  </div>);
};
