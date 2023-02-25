import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../../../api/api';
import { TrackRow } from '../../components/Track/TrackRow';
import { useTranslation } from 'react-i18next';
import style from './playlistPage.module.less';
import { ITrackTypes } from '../../../interface/interface';

type PlaylistProps = {
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
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

const timeSvg = () => {
  return (
    <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
      <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
    </svg>
  );
};

export const PlaylistTop: FC<{ playlist: SpotifyApi.PlaylistObjectFull | undefined }> = props => {
  const { t } = useTranslation();
  const img = props.playlist?.images[0];

  return (
    <div className={style.about} style={{ backgroundImage: `url(${img ? img.url : ''}` }}>
      <div className={style.aboutCover}></div>
      <div className={style.aboutContent}>
        <h2>{t('playlist')}</h2>
        <span className={style.playlistName}>{props.playlist?.name || `${t('playlist')}`}</span>
        <span className={style.playlistDescription}>{props.playlist?.description}</span>
        <ul className={style.playlistInfo}>
          <li>{props.playlist?.owner.display_name || 'Spotify'}</li>
          <li>{(props.playlist?.tracks.total || 0) + ` ${t('songs')}`}</li>
        </ul>
      </div>
    </div>
  );
};

export const PlaylisPage: FC<PlaylistProps> = props => {
  const { t } = useTranslation();
  const { id } = useParams();
  const FIELDS = ['#', `${t('TITLE')}`, `${t('ALBUM')}`, timeSvg()];
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const token = window.localStorage.getItem('token');

  const getPlaylistHandler = async () => {
    if (token && id) {
      const response = await getPlaylist({ token, id });
      setPlaylist(response);
    } else {
      console.log('!token || !id in playlist req', token, id);
    }
  };

  useEffect(() => {
    getPlaylistHandler();
  }, [id]);

  return (
    <div className={style.wrapper}>
      <PlaylistTop playlist={playlist} />
      <div className={style.playlistControls}></div>
      <div className={style.playlistBody}>
        <div className={style.tracksHeader}>
          {FIELDS.map((e, i) => (
            <div key={i} className={style['column' + i]}>
              {e}
            </div>
          ))}
        </div>
        {playlist?.tracks.items.map(e =>
          e.track?.preview_url ? (
            <TrackRow
              playlist={playlist}
              key={e.track?.id}
              track={e.track}
              isPlaying={props.isPlaying}
              setIsPlaying={props.setIsPlaying}
              player={props.player}
              trackId={props.trackId}
              setTrackId={props.setTrackId}
              setSongName={props.setSongName}
              setArtistName={props.setArtistName}
              setCoverUrl={props.setCoverUrl}
              setTrackDuration={props.setTrackDuration}
              setAlbumTracks={props.setAlbumTracks}
              setShuffle={props.setShuffle}
              likedSong={props.likedSong}
              setLikedSong={props.setLikedSong}
            ></TrackRow>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};
