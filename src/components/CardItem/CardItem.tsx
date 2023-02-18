import React from 'react';
import { Card } from 'antd';
import { AlbumType, Artist } from '../../../interface/interface';
import { useNavigate } from 'react-router-dom';
import style from './cardItem.module.less'
import { maxWidth } from '@mui/system';
const { Meta } = Card;

interface Playlist extends SpotifyApi.PlaylistObjectSimplified {
  artists?: Artist[];
}

interface Album extends AlbumType {
  description?: string | null;
}

interface SimpleAlbum extends SpotifyApi.AlbumObjectSimplified {
  description?: string | null;
}

type CardItemProps = {
  //token: string;
  album: Album | Playlist | SimpleAlbum;
  onClick?: () => void;
};

export const CardItem: React.FC<CardItemProps> = props => {
  const navigate = useNavigate();

  let link = '';
  if (props.album.images[0] ) {
    link = props.album.images[0].url;
  }

  return (
    <Card
      hoverable
      key={props.album.id}
      style={{
        background: '#181818',
        boxShadow: '0px 0px 5px 0px black',
        border: 'none',
        padding: '16px',
        width: '188px'
      }}
      cover={
        <div style={{
          margin: '0 auto',
          width: '155px',
          height: '155px',
          boxShadow: '0px 0px 5px 0px black',
          borderRadius: '4%',
          backgroundColor: '#000000',
          backgroundImage: `url(${link})`,
          backgroundSize: 'cover',
        }}></div>
      }
      onClick={props.onClick ? props.onClick : () => {
        navigate(`/album/${props.album.id}`); 
      }}
    >
    <Meta 
    style={{
      padding: '0px',
      height: '80px'}}
    description={
      <ul className={style.info}>
      <li className={style.name}>{props.album.name}</li>
      <li className={style.descr}>{props.album.artists 
        ? props.album.artists.map((e, i, a) => e.name + (i !== a.length - 1 ? ', ' : ''))
        : props.album.description}
      </li>
    </ul>
    }/>
    </Card>);
};
