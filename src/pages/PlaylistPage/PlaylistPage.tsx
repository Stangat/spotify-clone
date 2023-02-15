import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../../../api/api";
import { CustomHeader } from "../../components/Header/CustomHeader";
import style from './playlistPage.module.less';

type PlaylistProps = {
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
};

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
    </div>
  );
}
