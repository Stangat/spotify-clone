import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { getAlbums} from '../../../api';
import { AlbumType } from '../../../interface';
import { CardItem } from '../CardItem';
import styles from './styles.module.less';

type HomeContentProps = {
  token: string;
};

export const HomeContent: React.FC<HomeContentProps> = props => {
  const [albums, setALbums] = useState<AlbumType[]>([]);

  const getAlbumsHandler = async () => {
    const response = await getAlbums(props);
    setALbums(response);
  };

  useEffect(() => {
    getAlbumsHandler();
  }, []);

  return (
    <div className={styles.mainContentContainer}>
      <h2 className={styles.titleAlbums}>NEW RELEASES</h2>
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
          backgroundColor: '#1e1e1e',
          color: 'white',
          fontWeight: 600,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {albums.map(album => {
          return <CardItem key={album.id} album={album} />;
        })}
      </Content>
    </div>
  );
};
