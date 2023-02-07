import React from 'react';
import { Card } from 'antd';
import styles from './cardItem.module.less';
import { AlbumType } from '../../../interface/interface';

const { Meta } = Card;

type CardItemProps = {
  //token: string;
  album: AlbumType;
};

export const CardItem: React.FC<CardItemProps> = props => {
  return (
    <Card
      hoverable
      style={{
        maxWidth: 205,
        margin: '1%',
        background: '#181818',
        boxShadow: '0px 0px 5px 0px black',
        border: 'none',
        padding: '2%',
      }}
      cover={
        <img alt={props.album.label} src={props.album.images[0].url} style={{ boxShadow: '0px 0px 5px 0px black' }} />
      }
    >
      <Meta
        title={<div style={{ color: 'white' }}>{props.album.name}</div>}
        description={
          <div style={{ color: 'white' }}>
            Date of release: <br />
            {props.album.release_date}
          </div>
        }
      />
    </Card>
  );
};
