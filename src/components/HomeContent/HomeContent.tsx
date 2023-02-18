import { t } from 'i18next';
import React, { useEffect } from 'react';
import { getAlbums } from '../../../api/api';
import { AlbumType } from '../../../interface/interface';
import { CardItem } from '../CardItem/CardItem';
import styles from './homeContent.module.less';
import { useTranslation } from 'react-i18next';

type HomeContentProps = {
  token: string;
  totalAlbums: number;
  setTotalAlbums: (totalAlbums: number) => void;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

export const HomeContent: React.FC<HomeContentProps> = props => {
  const { t } = useTranslation();

  return (
    <div className={styles.mainContentContainer}>
      <h2 className={styles.titleAlbums}>{t('releases')}</h2>
      <div className={styles.wrapper}
        style={{
          backgroundColor: '#121212',
          color: 'white',
          fontWeight: 600,
          marginBottom: '10%',
        }}
      >
        {props.albums.map(album => {
          return <CardItem key={album.id} album={album}/>;
        })}
      </div>
    </div>
  );
};
