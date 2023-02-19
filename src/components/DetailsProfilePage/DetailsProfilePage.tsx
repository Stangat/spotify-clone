import { Avatar} from 'antd';
import {
  ITrackTypes,
  PlaylistsType,
  ProfileType,
  TopArtistsType,
} from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import { getFollowedArtists, getUserTopArtistsSpotifyApi, getUserTopTracks } from '../../../api/api';
import { useEffect, useState} from 'react';
//import { TopArtistBlock } from '../TopArtistBlock/TopArtistBlock';
//import { PlaylistBlock } from '../../pages/Library/PlaylistBlock/PlaylistBlock';
import { DropDownCopy } from '../DropDownCopy/DropDownCopy';
import { useTranslation } from 'react-i18next';
import { RowOfCards } from '../RowOfCards/RowOfCards';
import { CardArtist } from '../CardItem/CardArtist';

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
  topTracks: TopArtistsType | undefined;
  setTopTracks: (topTracks: TopArtistsType | undefined) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  const { t } = useTranslation();
  const [followedArtists, setFollowedArtists] = useState<SpotifyApi.UsersFollowedArtistsResponse>();
  const [topArtists, setTopArtists] = useState<SpotifyApi.UsersTopArtistsResponse>();
  const [topArtistsSortedList, setTopArtistsSortedList] = useState<SpotifyApi.ArtistObjectFull[]>();

  const getTopTracksUserHandler = async () => {
    const response = await getUserTopTracks({ token: props.token, limit: 4 });
    props.setTopTracks(response);
  };

  const getFollowedArtistsList = async () => {
    const response = await getFollowedArtists(props.token);
    setFollowedArtists(response);
  }

  const getUserTopArtistList = async () => {
    const response = await getUserTopArtistsSpotifyApi(props.token);
    const forSort =  [...response.items];
    setTopArtistsSortedList(forSort.sort((l, r) => r.popularity - l.popularity))
    setTopArtists(response);
  }

  useEffect(() => {
    getTopTracksUserHandler();
    getFollowedArtistsList();
    getUserTopArtistList();
  }, []);

  return (
    <div className={styles.detailsProfileContainer}>
      <div className={styles.blockProfileDescription} key={props.profile?.id}>
        <div className={styles.imageContainer}>
          <Avatar style={{height: '100%', width: '100%'}} icon={<UserOutlined />} src={props.profile?.images[0].url} />
        </div>
        <div className={styles.descriptionProfile}>
          <h2>{t('profile')}</h2>
          <h1 className={styles.userNameProfile}>{props.profile?.display_name}</h1>
          <div className={styles.descriptionItems}>
            <p>{props.playlists?.total} {t('publicPlaylists')}</p>
            <p>{followedArtists?.artists ? followedArtists?.artists.total : '0'} {t('following')}</p>
          </div>
        </div>
      </div>
      <div className={styles.bgUnderHat}></div>
      <div className={styles.bodyWrapper}>
        <div className={styles.dropDown}><DropDownCopy /></div>
        <div className={styles.followingContainer}>
          <RowOfCards title={'Top artists this month'}>{topArtistsSortedList?.map((e, i) => i < 8 ? <CardArtist style={{boxShadow: 'none',}} key={e.id} artist={e}></CardArtist> : '')}</RowOfCards>
        </div>
      </div>
      {/* <TopArtistBlock topArtists={props.topArtists} /> */}
      {/* <TopTracksBlock
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
      /> */}
      {/* <
       playlists={props.playlists} /> */}
    </div>
  );
};
