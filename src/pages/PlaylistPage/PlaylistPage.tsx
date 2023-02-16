import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../../api/api";
import { TrackRow } from "../../components/Track/TrackRow";
import style from './playlistPage.module.less';

type PlaylistProps = {
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
};

const timeSvg = () => {
  return(<svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path></svg>);
}

export const PlaylisPage: FC<PlaylistProps> = (props) => {
  const { id } = useParams(); 

  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const token = window.localStorage.getItem('token');

  const getPlaylistHandler = async () => {
    if (token && id) {
      const response = await getPlaylist({token, id});
      setPlaylist(response);
    } else {
      console.log('!token || !id in playlist req', token, id);
    }
  };

  useEffect(() => {
    getPlaylistHandler();
    props.player.addEventListener('ended', () => {
      props.setIsPlaying(false);
    });
  }, []);

  const FIELDS = ['#', 'TITLE', 'ALBUM', timeSvg()]

  const PlaylistTop: FC = () => {
    return (
    <div className={style.about} style={{backgroundImage: `url(${playlist?.images[playlist?.images.length - 1].url}`}}>
      <div className={style.aboutCover}></div>
      <div className={style.aboutContent}>
        <h2>Playlist</h2>
        <span className={style.playlistName}>{playlist?.name || 'Playlist'}</span>
        <span className={style.playlistDescription}>{playlist?.description}</span>
        <ul className={style.playlistInfo}>
          <li>{playlist?.owner.display_name || 'Spotify'}</li>
          <li>{(playlist?.tracks.total || 0) + ' songs'}</li>
        </ul>
      </div>
    </div>
    );
  };

  return(
    <div className={style.wrapper}>
      <PlaylistTop/>
      <div className={style.playlistControls}></div>
      <div className={style.playlistBody}>
        <div  className={style.tracksHeader}>
          {FIELDS.map((e, i) => <div className={style['column' + i]}>{e}</div>)}
        </div>
        {playlist?.tracks.items.map(e => <TrackRow track={e.track}></TrackRow>)}
      </div>
    </div>
  );
}
