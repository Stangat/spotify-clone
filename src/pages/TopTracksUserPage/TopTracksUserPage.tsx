import { Layout } from 'antd';
import { useEffect } from 'react';
import { getUserTopTracks } from '../../../api/api';
import {
  ITrackTypes,
  ProfileType,
} from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './topTracksUserPage.module.less';
import { useTranslation } from 'react-i18next';
import { TrackRow } from '../../components/Track/TrackRow';

type TopTracksUserPageProps = {
  token: string;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  setToken: (token: string) => void;
  topTracks: SpotifyApi.UsersTopTracksResponse | undefined;
  setTopTracks: (topTracks: SpotifyApi.UsersTopTracksResponse | undefined) => void;
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
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  setShuffle: (shuffle: boolean) => void;
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

export const TopTracksUserPage: React.FC<TopTracksUserPageProps> = props => {
  const getTopTracksUserHandler = async () => {
    const response: SpotifyApi.UsersTopTracksResponse = await getUserTopTracks({ token: props.token, limit: 50 });
    props.setTopTracks(response);
    localStorage.setItem('albumTracks', JSON.stringify(response.items));
  };

  const { t } = useTranslation();
  const timeSvg = () => {
    return (
      <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
      </svg>
    );
  };
  const FIELDS = ['#', `${t('TITLE')}`, `${t('ALBUM')}`, timeSvg()];

  useEffect(() => {
    getTopTracksUserHandler();
  }, []);

  return (
    <div style={{ background: '#121212', width: '100%' }}>
      <Layout hasSider style={{ background: '#121212', marginBottom: '10%' }}>
        <Layout style={{ background: '#121212', display: 'flex' }}>
          <div className={style.header}>
            <DropdownProfile
              setToken={props.setToken}
              profile={props.profile}
              setProfile={props.setProfile}
              token={props.token}
            />
          </div>
          <div className={style.topTracksUserPageContainer}>
            <div>
              <p className={style.headerParagraph}>Top tracks this month</p>
              <p className={style.headerSubParagraph}>Only visible to you</p>
            </div>
            <div className={style.tracksHeader}>
              {FIELDS.map((e, i) => (
                <div key={i} className={style['column' + i]}>
                  {e}
                </div>
              ))}
            </div>
            {props.topTracks?.items.map((track, index: number) => (
              <TrackRow
                key={index}
                track={track}
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
            ))}
          </div>
        </Layout>
      </Layout>
    </div>
  );
};
