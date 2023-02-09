import { useEffect, useState } from 'react';
import { getAlbumTracks } from '../../../api/api';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import styles from './details.module.less';
import { PlayCircleFilled } from '@ant-design/icons';

type DetailsAlbumContentProps = {
  token: string;
  id: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

const playingTrack = (url: string) => {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = url; // Указываем путь к звуку "клика"
  audio.play(); // Автоматически запускаем
};
export const DetailsAlbumContent: React.FC<DetailsAlbumContentProps> = props => {
  //console.log(props.albums);
  const [tracks, setTracks] = useState<ITrackTypes[]>([]);
  // console.log(tracks);
  const getTracksHandler = async () => {
    const response = await getAlbumTracks({ id: props.id, token: props.token });
    setTracks(response.items);
  };

  useEffect(() => {
    getTracksHandler();
  }, []);
  return (
    <div className={styles.detailsContentContainer}>
      <div key={props.id}>
        {props.albums.map(album => {
          if (album.id === props.id) {
            return (
              <div
                key={props.id}
                className={styles.blockImage}
                style={{
                  backgroundImage: `url(${album.images[0].url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <div className={styles.boxBlur}>
                  <img
                    className={styles.imageAlbum}
                    key={album.id}
                    alt={album.label}
                    src={album.images[1].url}
                    style={{ boxShadow: '0px 0px 5px 0px black' }}
                  />
                  <div className={styles.descriptionAlbumTracks}>
                    <p className={styles.typeAlbum}>{album.type}</p>
                    <p className={styles.albumName}>{album.name}</p>
                    <div className={styles.descriptionBottom}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {album.artists.map(artist => {
                          return <p key={artist.id}> {artist.name} · </p>;
                        })}
                      </div>
                      <p>{album.release_date.slice(0, 4)} · </p>
                      <p>{album.total_tracks} songs</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.tracksBlock}>
        {tracks.map(track => {
          return (
            <div className={styles.trackBlock} key={track.id}>
              <div className={styles.artistDesc}>
                <PlayCircleFilled
                  style={{ color: '#1ad760', fontSize: '32px' }}
                  onClick={() => playingTrack(track.preview_url)}
                />
                <div >
                  <p>{track.name}</p>
                  <p style={{ color: '#a0a0a0' }}>
                    {track.artists.map(artist => {
                      return artist.name;
                    })}
                  </p>
                </div>
              </div>

              <p>{(track.duration_ms / 60000).toFixed(2)} min</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
