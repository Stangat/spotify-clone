import { useEffect, useState } from 'react';
import { getAlbumTracks, getTrack } from '../../../api/api';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import styles from './details.module.less';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

type DetailsAlbumContentProps = {
  token: string;
  id: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
};

export const DetailsAlbumContent: React.FC<DetailsAlbumContentProps> = props => {
  const [tracks, setTracks] = useState<ITrackTypes[]>([]);
  const [buttonKey, setButtonKey] = useState(-1);

  const playingTrackHandler = (url: string) => {
    if (!props.isPlaying) {
      props.player.src = url;
      props.player.play();
      props.setIsPlaying(true);
    } else {
      props.player.pause();
      props.setIsPlaying(false);
    }
  };

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
        {tracks.map((track, index) => {
          return (
            <div className={styles.trackBlock} key={track.id}>
              <div className={styles.artistDesc}>
                {props.isPlaying && index === buttonKey ? (
                  <PauseCircleFilled
                    className={styles.playPauseButton}
                    key={index}
                    onClick={() => {
                      playingTrackHandler(track.preview_url);
                    }}
                  />
                ) : (
                  <PlayCircleFilled
                    className={styles.playPauseButton}
                    key={index}
                    onClick={async () => {
                      playingTrackHandler(track.preview_url);
                      setButtonKey(index);
                      props.setSongName(track.name);
                      props.setArtistName(track.artists[0].name);
                      const currentTrack = await getTrack(props.token, track.id);
                      const url = await currentTrack.album.images[0].url;
                      props.setCoverUrl(url);
                    }}
                  />
                )}

                <div>
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
