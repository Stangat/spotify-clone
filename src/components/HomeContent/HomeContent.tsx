import React, { useEffect } from 'react';
import { getAlbums } from '../../../api/api';
import { AlbumType } from '../../../interface/interface';
import { CardItem } from '../CardItem/CardItem';
import styles from './homeContent.module.less';

type HomeContentProps = {
  token: string;
  offset: number;
  limit: number;
  totalAlbums: number;
  setTotalAlbums: (totalAlbums: number) => void;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

export const HomeContent: React.FC<HomeContentProps> = props => {
/*   const [albums, setALbums] = useState<AlbumType[]>([]); */

  const getAlbumsHandler = async () => {
    const response = await getAlbums({ limit: props.limit, offset: props.offset, token: props.token });
    props.setALbums(response.albums.items);
    props.setTotalAlbums(response.albums.total);
  };

  useEffect(() => {
    getAlbumsHandler();
  }, [props.offset]);

  return (
    <div className={styles.mainContentContainer}>
      <h2 className={styles.titleAlbums}>NEW RELEASES</h2>
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
