import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { CardItem } from '../CardItem';

export const HomeContent: React.FC = () => {
  let count = 0;
  return (
    <Content
      style={{
        margin: '24px 16px 0',
        overflow: 'initial',
        backgroundColor: '#1e1e1e',
        color: 'white',
        fontWeight: 600,
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </Content>
  );
};
