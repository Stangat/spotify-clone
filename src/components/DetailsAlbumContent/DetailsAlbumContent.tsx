import { useEffect, useState } from 'react';
import { getAlbumTracks } from '../../../api/api';
import { ITrackTypes } from '../../../interface/interface';
import styles from './details.module.less';

type DetailsAlbumContentProps = {
  token: string;
  id: string;
};
export const DetailsAlbumContent: React.FC<DetailsAlbumContentProps> = props => {
  const [tracks, setTracks] = useState<ITrackTypes[]>([]);

  const getTracksHandler = async () => {
    const response = await getAlbumTracks({ id: props.id, token: props.token });
    console.log(response);
    setTracks(response.items);
  };

  useEffect(() => {
    getTracksHandler();
  }, []);
  return (
    <div className={styles.detailsContentContainer}>
      {tracks.map(track => {
        return (
          <div key={track.id}>
            <div>
              <div className={styles.descriptionAlbumTracks}>
                <p className={styles.trackName}>{track.name}</p>
                <h4>Duration: {(track.duration_ms / 60000).toFixed(2)} min</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {track.artists.length} artists:{' '}
                  {track.artists.map(artist => {
                    return <h3 key={artist.id}> {artist.name}</h3>;
                  })}
                </div>
                <h3>{tracks.length} songs in album</h3>
              </div>
            </div>
            <audio id={track.id} controls>
              <source src={track.preview_url} type="audio/mpeg" />
            </audio>
          </div>
        );
      })}
    </div>
  );
};
