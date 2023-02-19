import { Avatar} from 'antd';
import {
  ITrackTypes,
  PlaylistsType,
  ProfileType,
  TopArtistsType,
} from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import { getUserPlaylists, getUserTopArtist, getUserTopTracks } from '../../../api/api';
import { useEffect} from 'react';
import { TopArtistBlock } from '../TopArtistBlock/TopArtistBlock';
import { TopTracksBlock } from '../TopTracksBlock/TopTracksBlock';
import { PlaylistBlock } from '../PlaylistBlock/PlaylistBlock';
import { DropDownCopy } from '../DropDownCopy/DropDownCopy';
import { useTranslation } from 'react-i18next';

type DetailsProfilePageProps = {
  token: string;
  profile: ProfileType | undefined;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
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
  topArtists: TopArtistsType | undefined;
  setTopArtists: (topArtists: TopArtistsType | undefined) => void;
  topTracks: TopArtistsType | undefined;
  setTopTracks: (topTracks: TopArtistsType | undefined) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  const { t } = useTranslation();

  const getTopTracksUserHandler = async () => {
    const response = await getUserTopTracks({ token: props.token, limit: 4 });
    props.setTopTracks(response);
  };

  useEffect(() => {
    getTopTracksUserHandler();
  }, []);

  return (
    <div className={styles.detailsProfileContainer}>
      <div className={styles.blockProfileDescription} key={props.profile?.id}>
        <div style={{ padding: '2%' }}>
          <Avatar size={250} icon={<UserOutlined />} src={props.profile?.images[0].url} />
        </div>
        <div className={styles.descriptionProfile}>
          <p>{t('profile')}</p>
          <p className={styles.userNameProfile}>{props.profile?.display_name}</p>
          <p>{props.playlists?.total} {t('publicPlaylists')}</p>
          <p>{t('followers')}: {props.profile?.followers.total}</p>
        </div>
      </div>
      <DropDownCopy />
      <TopArtistBlock topArtists={props.topArtists} />
      <TopTracksBlock
        topTracks={props.topTracks}
        topArtists={props.topArtists}
        setTopArtists={props.setTopArtists}
        profile={props.profile}
        playlists={props.playlists}
        setPlaylists={props.setPlaylists}
        token={props.token}
        setIsPlaying={props.setIsPlaying}
        isPlaying={props.isPlaying}
        player={props.player}
        setSongName={props.setSongName}
        setArtistName={props.setArtistName}
        setCoverUrl={props.setCoverUrl}
        trackDuration={props.trackDuration}
        setTrackDuration={props.setTrackDuration}
        trackId={props.trackId}
        setTrackId={props.setTrackId}
        albumTracks={props.albumTracks}
        setAlbumTracks={props.setAlbumTracks}
        shuffle={props.shuffle}
        setShuffle={props.setShuffle}
      />
      <PlaylistBlock playlists={props.playlists} />
    </div>
  );
};
