import { t } from 'i18next';
import React, { useEffect } from 'react';
import { getAlbums } from '../../../api/api';
import { AlbumType } from '../../../interface/interface';
import { CardItem } from '../CardItem/CardItem';
import styles from './homeContent.module.less';
import { useTranslation } from 'react-i18next';
import { PaginationHeader } from '../Pagination/Pagination';

type HomeContentProps = {
  token: string;
  totalAlbums: number;
  setTotalAlbums: (totalAlbums: number) => void;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
};

export const HomeContent: React.FC<HomeContentProps> = props => {
  const { t } = useTranslation();

  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.hat}>
        <h2 className={styles.titleAlbums}>{t('releases')}</h2>
        <PaginationHeader page={props.page} setPage={props.setPage} totalAlbums={props.totalAlbums} limit={props.limit}/>
      </div>
      <div className={styles.wrapper}
        style={{
          backgroundColor: '#121212',
          color: 'white',
          fontWeight: 600,
        }}
      >
        {props.albums.map(album => {
          return <CardItem key={album.id} album={album}/>;
        })}
      </div>
    </div>
  );
};
