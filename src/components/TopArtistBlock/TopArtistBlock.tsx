import { useEffect, useState } from 'react';
import { getUserTopArtistsSpotifyApi } from '../../../api/api';
import { CardArtist } from '../CardItem/CardArtist';
import styles from './topArtistsBlock.less';

type TopArtistBlockProps = {
  token: string;
};

export const TopArtistBlock: React.FC<TopArtistBlockProps> = props => {
  const [userTopArtists, setUserTopArtists] = useState<SpotifyApi.UsersTopArtistsResponse>();

  const getUserData = async () => {
    const response = await getUserTopArtistsSpotifyApi(props.token);
    setUserTopArtists(response);
  };

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <div className={styles.wrapper}>
      <h1>Artists</h1>
      <div className={styles.container}>
        {userTopArtists?.items.map(e => <CardArtist artist={e}></CardArtist>)}
      </div>
    </div>
  );
};
