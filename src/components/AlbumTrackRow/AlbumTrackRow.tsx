import { Fragment, useEffect, useState } from 'react';
import {
  checkUserSavedTracksSpotifyApi,
  getAlbumTracks,
  getTrack,
  removeUserSavedTracksSpotifyApi,
  saveTrackForCurrentUserSpotifyApi,
} from '../../../api/api';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import { PlayCircleFilled, PauseCircleFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './albumTrackRow.module.less';
import { useNavigate } from 'react-router-dom';

type AlbumTrackRowProps = {
  token: string;
  track: ITrackTypes;
  id: string;
  albums: AlbumType[];
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

export const AlbumTrackRow: React.FC<AlbumTrackRowProps> = props => {
  const [isSaved, setIsSaved] = useState<boolean>();
  const navigate = useNavigate();

  const timeCorrection = (duration: number) => {
    const min = Math.trunc(duration / 60000);
    const sec = Math.trunc(((duration / 60000) % 1) * 60);

    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

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

  const passTrackToPlayer = async (track: ITrackTypes | null, token: string) => {
    if (track?.preview_url) {
      playingTrackHandler(track?.preview_url);
      props.setSongName(track?.name);
      props.setArtistName(track?.artists[0].name);
      const currentTrack = await getTrack(token, track.id);
      const url = await currentTrack.album.images[0].url;
      props.setCoverUrl(url);
      props.player.preload = 'metadata';
      props.player.onloadedmetadata = () => {
        props.setTrackDuration(props.player.duration);
      };
      props.setTrackId(track?.id);
    }
  };

  function shuffleAndAlbumTracksLocalStorageHandler<Type>(tracks: Type) {
    const shuffled = localStorage.getItem('shuffled');
    if (shuffled !== 'true') {
      localStorage.setItem('albumTracks', JSON.stringify(tracks));
    } else {
      localStorage.setItem('shuffled', '');
      props.setShuffle(false);
      localStorage.setItem('albumTracks', JSON.stringify(tracks));
    }
  }

  const checkTracksHandler = async () => {
    const result = await checkUserSavedTracksSpotifyApi(props.token, props.track.id);
    setIsSaved(result[0]);
  };

  useEffect(() => {
    checkTracksHandler();
  }, [props.likedSong]);

  return (
    <>
      <div className={styles.trackBlock}>
        <div className={styles.artistDesc}>
          {props.isPlaying && props.track.id === props.trackId ? (
            <PauseCircleFilled
              className={styles.playPauseButton}
              onClick={() => {
                if (props.track.preview_url) {
                  playingTrackHandler(props.track.preview_url);
                }
              }}
            />
          ) : (
            <PlayCircleFilled
              className={styles.playPauseButton}
              onClick={async () => {
                const trackCheck = await checkUserSavedTracksSpotifyApi(props.token, props.track.id);
                props.setLikedSong(trackCheck[0]);
                passTrackToPlayer(props.track, props.token);
                const response = await getAlbumTracks({ id: props.id, token: props.token });
                props.setAlbumTracks(response.items);
                shuffleAndAlbumTracksLocalStorageHandler<ITrackTypes[]>(response.items);
              }}
            />
          )}
          <div>
            {props.track.id === props.trackId ? (
              <p className={styles.trackNameActive}>{props.track.name}</p>
            ) : (
              <p className={styles.trackName}>{props.track.name}</p>
            )}

            <p className={styles.artistName}>
              {props.track.artists.map((e, i, a) => (
                <Fragment key={e.id}>
                  <a key={e.id} onClick={()=> navigate(`/artist/${e.id}`)}>{e.name}</a>
                  {`${i !== a.length - 1 ? ', ' : ''}`}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
        <div className={styles.trackDurationContainer}>
          {isSaved ? (
            <HeartFilled
              className={styles.likeSongButtonActive}
              onClick={async () => {
                if (props.track.id === props.trackId) {
                  props.setLikedSong(false);
                }
                await removeUserSavedTracksSpotifyApi(props.token, props.track.id);
                setIsSaved(false);
              }}
            />
          ) : (
            <HeartOutlined
              className={styles.likeSongButton}
              onClick={async () => {
                if (props.track.id === props.trackId) {
                  props.setLikedSong(true);
                }
                setIsSaved(true);
                await saveTrackForCurrentUserSpotifyApi(props.token, props.track.id, { id: [props.track.id] });
              }}
            />
          )}
          {<p className={styles.trackDuration}>{timeCorrection(props.track.duration_ms)}</p>}
        </div>
      </div>
    </>
  );
};
