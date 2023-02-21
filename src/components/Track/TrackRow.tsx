import { FC, Fragment, ReactNode } from 'react';
import style from './trackRow.module.less';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { getTrack, getTracksPLaylist, getUserSavedTracks } from '../../../api/api';
import { ITrackTypes, TrackPlaylist } from '../../../interface/interface';
import { useNavigate, useParams } from 'react-router-dom';

// const PlayButton: FC = () => {
//   return (
//     <svg className={style.play} fill="#ffffff" height="24" width="24" viewBox="0 0 24 24">
//       <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
//     </svg>
//   );
// };

type TrackPoprs = {
  uniqueTracks?: SpotifyApi.TrackObjectFull[];
  track: SpotifyApi.TrackObjectFull | null;
  children?: ReactNode;
  album?: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  trackId: string;
  setTrackId: (trackId: string) => void;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  setTrackDuration: (trackDuration: number) => void;
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  setShuffle: (shuffle: boolean) => void;
};

export const TrackRow: FC<TrackPoprs> = ({ album = true, ...props }) => {
  const milliseconds = props.track?.duration_ms || 0;
  const time = {
    minutes: parseInt(`${milliseconds / 1000 / 60}`),
    seconds: parseInt(`${(milliseconds / 1000) % 60}`),
  };

  const token = window.localStorage.getItem('token');
  const { id } = useParams();
  const { query } = useParams();
  const navigate = useNavigate();

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

  const passTrackToPlayer = async (track: SpotifyApi.TrackObjectFull | null, token: string) => {
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

  return (
    <div className={style.wrapper}>
      <div className={style.columnPlay}>
        {/* <PlayButton></PlayButton> */}
        {props.isPlaying && props.track?.id === props.trackId ? (
          <PauseCircleFilled
            className={style.playPauseButton}
            onClick={() => {
              if (props.track?.preview_url) {
                playingTrackHandler(props.track?.preview_url);
              }
            }}
          />
        ) : (
          <PlayCircleFilled
            className={style.playPauseButton}
            onClick={async () => {
              if (props.track && props.track?.preview_url && props.track?.name && token) {
                if (id) {
                  passTrackToPlayer(props.track, token);
                  const response = await getTracksPLaylist(token, id ? id : '');
                  let tracks: SpotifyApi.TrackObjectFull[] = response.items.map(
                    (item: SpotifyApi.PlaylistTrackObject) => item.track
                  );
                  tracks = tracks.filter(track => track?.preview_url !== null);
                  props.setAlbumTracks(tracks);
                  shuffleAndAlbumTracksLocalStorageHandler<SpotifyApi.TrackObjectFull[]>(tracks);
                } else if (query) {
                  passTrackToPlayer(props.track, token);
                  const responseTracks = props.uniqueTracks;
                  if (responseTracks) {
                    const tracks = responseTracks.filter(item => item.preview_url !== null);
                    shuffleAndAlbumTracksLocalStorageHandler<SpotifyApi.TrackObjectFull[]>(tracks);
                    if (tracks) {
                      props.setAlbumTracks(tracks);
                    }
                  }
                } else {
                  passTrackToPlayer(props.track, token);
                  const response: SpotifyApi.UsersSavedTracksResponse = await getUserSavedTracks(token);
                  const tracks = response.items.map(item => item.track);
                  props.setAlbumTracks(tracks);
                  shuffleAndAlbumTracksLocalStorageHandler<SpotifyApi.TrackObjectFull[]>(tracks);
                }
              }
            }}
          />
        )}
      </div>
      <div className={style.columnData}>
        <img className={style.image} src={props.track?.album.images[0].url} alt="img" />
        <div>
          {props.track && props.track.id === props.trackId ? (
            <span className={style.nameActive}>{props.track?.name}</span>
          ) : (
            <span className={style.name}>{props.track?.name}</span>
          )}
          {/* <span className={style.name}>{props.track?.name}</span> */}
          <div className={style.artists}>
            {props.track?.artists.map((e, i, a) => (
              <Fragment key={e.id}>
                <a key={e.id} onClick={()=> navigate(`/artist/${e.id}`)}>{e.name}</a>
                {`${i !== a.length - 1 ? ', ' : ''}`}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className={style.columnAlbum} hidden={!album}>
        {props.track?.album.name}
      </div>
      <div className={style.columnDuration}>
        {time.minutes + ':' + (String(time.seconds).length == 1 ? '0' + time.seconds : time.seconds)}
      </div>
    </div>
  );
};
