import { useEffect, useState } from 'react';
import { getUserSavedTracks } from '../../../api/api';
import { ITrackTypes, ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './likedSongs.module.less';
import { TrackRow } from '../../components/Track/TrackRow';
import { HeartFilled } from '@ant-design/icons';

type LikedSongsPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
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

export const LikedSongs: React.FC<LikedSongsPageProps> = props => {
  const [userSavedSongs, setUserSavedSongs] = useState<SpotifyApi.UsersSavedTracksResponse>();

  const timeSvg = () => {
    return (
      <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
      </svg>
    );
  };
  const FIELDS = ['#', 'TITLE', 'ALBUM', timeSvg()];

  const getUserSavedTracksHandler = async () => {
    const response:SpotifyApi.UsersSavedTracksResponse = await getUserSavedTracks(props.token);
    setUserSavedSongs(response);
  };

  useEffect(() => {
    getUserSavedTracksHandler();
  }, []);

  return (
    <div className={style.wrapper}>
      <DropdownProfile
        setToken={props.setToken}
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
      />
      <div className={style.blockTop}>
        <div className={style.picture}>
          <HeartFilled className={style.heartFilled} />
        </div>
        <div className={style.blockData}>
          <p className={style.blockCategory}>Playlist</p>
          <p className={style.blockName}>Liked Songs</p>
          <p className={style.blockUserName}>
            {userSavedSongs?.total === undefined
              ? ''
              : userSavedSongs?.total < 10
              ? `${props.profile?.display_name} • ${userSavedSongs?.total} song`
              : `${props.profile?.display_name} • ${userSavedSongs?.total} songs`}
          </p>
        </div>
      </div>
      <div className={style.playlistBody}>
        <div className={style.tracksHeader}>
          {FIELDS.map((e, i) => (
            <div key={i} className={style['column' + i]}>
              {e}
            </div>
          ))}
        </div>
        {userSavedSongs?.items.map(e => (
          <TrackRow
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
          ></TrackRow>
        ))}
      </div>
    </div>
  );
};
