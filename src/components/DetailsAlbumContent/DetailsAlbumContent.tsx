import { useEffect, useState } from 'react';
import { getAlbumTracks, getTrack} from '../../../api/api';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import styles from './details.module.less';

type DetailsAlbumContentProps = {
  token: string;
  id: string;
  albums: AlbumType[];
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const DetailsAlbumContent: React.FC<DetailsAlbumContentProps> = props => {
  const [tracks, setTracks] = useState<ITrackTypes[]>([]);

  const timeSvg = () => {
    return (
      <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
      </svg>
    );
  };

  const FIELDS = ['#', 'TITLE', timeSvg()];

  const playingTrackHandler = (url: string) => {
    if (!props.isPlaying) {
      props.player.src = url;
      props.player.play();
      props.setIsPlaying(true);
    } else {
      if (props.player.src !== url) {
        props.player.src = url;
        props.player.play();
      } else {
        props.player.pause();
        props.setIsPlaying(false);
      }
    }
  };

  const getTracksHandler = async () => {
    const response = (await getAlbumTracks({ id: props.id, token: props.token })).items;
    setTracks(response);
  };

  const timeCorrection = (duration: number) => {
    const min = Math.trunc(duration / 60000);
    const sec = Math.trunc(((duration / 60000) % 1) * 60);

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  useEffect(() => {
    getTracksHandler();
  }, []);

  return (
    <div className={styles.detailsContentContainer}>
      <div key={props.id}>
        {props.albums.map(album => {
          if (album.id === props.id) {
            // TODO req
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
                  <img className={styles.imageAlbum} key={album.id} alt={album.label} src={album.images[1].url} />
                  <div className={styles.descriptionAlbumTracks}>
                    <p className={styles.typeAlbum}>{album.type}</p>
                    {album.name.length > 17 ? (
                      <p className={styles.albumNameMini}>{album.name}</p>
                    ) : (
                      <p className={styles.albumName}>{album.name}</p>
                    )}
                    <div className={styles.descriptionBottom}>
                      <div className={styles.detailsContainer}>
                        {album.artists.map(artist => {
                          return (
                            <p className={styles.name} key={artist.id}>
                              {`${artist.name}`}
                            </p>
                          );
                        })}
                      </div>
                      <p className={styles.date}>{`• ${album.release_date.slice(0, 4)} •`}</p>
                      <p className={styles.songs}>
                        {album.total_tracks < 10 ? `${album.total_tracks} song` : `${album.total_tracks} songs`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.albumBody}>
        <div className={styles.tracksHeader}>
          {FIELDS.map((e, i) => (
            <div key={i} className={styles['column' + i]}>
              {e}
            </div>
          ))}
        </div>
        <div className={styles.tracksBlock}>
          {tracks.map((track, index) => {
            return (
              <div className={styles.trackBlock} key={track.id}>
                <div className={styles.artistDesc}>
                  {props.isPlaying && track.id === props.trackId ? (
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
                        props.setSongName(track.name);
                        props.setArtistName(track.artists[0].name);
                        const currentTrack = await getTrack(props.token, track.id);
                        const url = await currentTrack.album.images[0].url;
                        props.setCoverUrl(url);
                        props.player.preload = 'metadata';
                        props.player.onloadedmetadata = () => {
                          props.setTrackDuration(props.player.duration);
                        };
                        props.setTrackId(track.id);
                        const response = await getAlbumTracks({ id: props.id, token: props.token });
                        props.setAlbumTracks(response.items);
                        const shuffled = localStorage.getItem('shuffled');
                        if (shuffled !== 'true') {
                          localStorage.setItem('albumTracks', JSON.stringify(response.items));
                        } else {
                          localStorage.setItem('shuffled', '');
                          props.setShuffle(false);
                          localStorage.setItem('albumTracks', JSON.stringify(response.items));
                        }
                      }}
                    />
                  )}

                  <div>
                    {track.id === props.trackId ? (
                      <p className={styles.trackNameActive}>{track.name}</p>
                    ) : (
                      <p className={styles.trackName}>{track.name}</p>
                    )}

                    <p className={styles.artistName}>
                      {track.artists.map(artist => {
                        return artist.name;
                      })}
                    </p>
                  </div>
                </div>

                {<p className={styles.trackDuration}>{timeCorrection(track.duration_ms)}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
