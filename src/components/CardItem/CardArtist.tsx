import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './cardItem.module.less'
const { Meta } = Card;

type CardItemProps = {
  artist: SpotifyApi.ArtistObjectFull;
  onClick?: () => void;
  className?: string; 
  style?: React.CSSProperties;
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
      style={Object.assign({}, {
        background: '#181818',
        border: 'none',
        padding: '16px',
        width: '188px'
      }, props.style || {})}
      cover={
        <div style={{
          margin: '0 auto',
          width: '155px',
          height: '155px',
          boxShadow: '0 8px 24px rgb(0 0 0 / 50%)',
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
      <li style={{textTransform: 'capitalize',}}>{props.artist.type}</li>
    </ul>
    }/>
    </Card>);
};
