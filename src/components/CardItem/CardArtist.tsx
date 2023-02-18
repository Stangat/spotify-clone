import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './cardItem.module.less'
const { Meta } = Card;

type CardItemProps = {
  artist: SpotifyApi.ArtistObjectFull;
  onClick?: () => void;
};

export const CardArtist: React.FC<CardItemProps> = props => {
  const navigate = useNavigate();

  let link = '';
  if (props.artist.images[0]) {
    link = props.artist.images[0].url;
  }

  return (
    <Card
      hoverable
      key={props.artist.id}
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
          backgroundColor: '#000000',
          backgroundImage: `url(${link})`,
          backgroundSize: 'cover',
          borderRadius: '50%',
        }}></div>
      }
      onClick={props.onClick ? props.onClick : () => {
        navigate(`/artist/${props.artist.id}`); 
      }}
    >
    <Meta 
    style={{
      padding: '0px',
      height: '80px'}}
    description={
      <ul className={style.info}>
      <li className={style.name}>{props.artist.name}</li>
      <li>{props.artist.type}</li>
    </ul>
    }/>
    </Card>);
};
