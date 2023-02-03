import React from 'react';
import { Card } from 'antd';
import styles from './styles.module.less';

const { Meta } = Card;

type CardItemProps = {
  token: string;
};


export const CardItem: React.FC<CardItemProps> = (props) => {
  return (
    <Card
      hoverable
      style={{ maxWidth: 205, margin: '1%', background: '#181818', boxShadow: '0px 0px 5px 0px black', border: 'none' }}
      cover={
        <img
          alt="example"
          src="https://sun9-32.userapi.com/impf/c824410/v824410925/a2bd9/0ldCvjBG7VA.jpg?size=600x538&quality=96&sign=ed37b84639173ca9b665a2936e4700fa&c_uniq_tag=U96ccBCNfZ2yUYtt6uXvCW3jcTYnQaC0uyb1hGxUR0I&type=album"
        />
      }
    >
      <Meta title="Нам кабзда,тут название" description="тут что за он" />
    </Card>
  );
};
