import { useEffect, useState } from 'react';
import { getAlbumTracks, getTrack } from '../../../api/api';
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
    const response = await (await getAlbumTracks({ id: props.id, token: props.token })).items;
    setTracks(response);
  };

  useEffect(() => {
    getTracksHandler();
  }, []);

  return (
    <div className={styles.detailsContentContainer}>
      <div key={props.id}>
        {props.albums.map(album => {
          if (album.id === props.id) { // TODO req
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
``;
