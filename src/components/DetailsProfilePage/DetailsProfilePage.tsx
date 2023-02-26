import { Avatar } from 'antd';
import { ITrackTypes, PlaylistsType, ProfileType, TopArtistsType } from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import {
  getFollowedArtists,
  getUserPlaylistsSpotifyApi,
  getUserTopArtistsSpotifyApi,
  getUserTopTracks,
  getUserTopTracksSpotifyApi,
} from '../../../api/api';
import { useEffect, useState } from 'react';
import { DropDownCopy } from '../DropDownCopy/DropDownCopy';
import { useTranslation } from 'react-i18next';
import { RowOfCards } from '../RowOfCards/RowOfCards';
import { CardArtist } from '../CardItem/CardArtist';
import { TopTracksBlock } from '../TopTracksBlock/TopTracksBlock';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { TrackRow } from '../Track/TrackRow';
import { CardItem } from '../CardItem/CardItem';

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
  topTracks: SpotifyApi.UsersTopTracksResponse | undefined;
  setTopTracks: (topTracks: SpotifyApi.UsersTopTracksResponse | undefined) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  const [topArtists, setTopArtists] = useState<SpotifyApi.UsersTopArtistsResponse>();
  const [followedArtists, setFollowedArtists] = useState<SpotifyApi.UsersFollowedArtistsResponse>();
  const [topTracksSpotifyApi, setTopTracksSpotifyApi] = useState<SpotifyApi.UsersTopTracksResponse>();
  const [userPlaylists, setUserPlaylists] = useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const { id } = useParams();

  const getTopTracksUserHandler = async () => {
    const response = await getUserTopTracks({ token: props.token, limit: 4 });
    // console.log(response.items)
    const response2 = await getUserTopTracksSpotifyApi(props.token, 5);
    setTopTracksSpotifyApi(response2);
    props.setTopTracks(response);
  };

  const getUserPlaylists = async () => {
    const response = await getUserPlaylistsSpotifyApi(props.token);
    setUserPlaylists(response);
  };

  const getFollowedArtistsList = async () => {
    const response = await getFollowedArtists(props.token);
    setFollowedArtists(response);
  };

  const getUserTopArtistList = async () => {
    const response = await getUserTopArtistsSpotifyApi(props.token);
    response.items.sort((l, r) => r.popularity - l.popularity);
    setTopArtists(response);
  };

  useEffect(() => {
    getTopTracksUserHandler();
    getFollowedArtistsList();
    getUserTopArtistList();
    getUserPlaylists();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={styles.detailsProfileContainer}>
            <div className={styles.blockProfileDescription} key={props.profile?.id}>
              <div className={styles.imageContainer}>
                <Avatar
                  style={{ height: '100%', width: '100%' }}
                  icon={<UserOutlined />}
                  src={props.profile?.images[0] ? props.profile?.images[0].url : ''}
                />
              </div>
              <div className={styles.descriptionProfile}>
                <h2>{t('profile')}</h2>
                <h1 className={styles.userNameProfile}>{props.profile?.display_name}</h1>
                <div className={styles.descriptionItems}>
                  <p>
                    {props.playlists?.total} {t('publicPlaylists')}
                  </p>
                  <p>
                    {followedArtists?.artists ? followedArtists?.artists.total : '0'} {t('following')}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.bgUnderHat}></div>
            <div className={styles.bodyWrapper}>
              <div className={styles.dropDown}>
                <DropDownCopy />
              </div>
              <div className={styles.followingContainer}>
                <RowOfCards title={'Top artists this month'} subtitle={`${t('visible')}`}>
                  {topArtists?.items &&
                    topArtists?.items?.map((e, i) =>
                      i < 8 ? <CardArtist style={{ boxShadow: 'none' }} key={e.id} artist={e}></CardArtist> : ''
                    )}
                </RowOfCards>
              </div>
              <div className={styles.subblockContainer}>
                <div className={styles.blockHeader}>
                  <div>
                    <h2>{t('topTrack')}</h2>
                    <p>{t('visible')}</p>
                  </div>
                  <p
                    className={styles.showAll}
                    style={{
                      display:
                        topTracksSpotifyApi?.items && topTracksSpotifyApi?.items.length > 4 ? 'inline-block' : 'none',
                    }}
                    onClick={() => {
                      navigate(`tracks`, { replace: false });
                    }}
                  >
                    {t('showAll')}
                  </p>
                </div>
                <div className={styles.topTracksContainer}>
                  {props.topTracks?.items &&
                    props.topTracks?.items.map((track, index) => (
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
              </div>
              <div className={styles.subblockContainer}>
                <div className={styles.blockHeader + ' ' + styles.withoutVisibility}>
                  <h2>{'Public Playlists'}</h2>
                  <p
                    className={styles.showAll}
                    style={{
                      display: userPlaylists?.items && userPlaylists?.items.length > 8 ? 'inline-block' : 'none',
                    }}
                    onClick={() => navigate('playlists')}
                  >
                    {' '}
                    {t('showAll')}
                  </p>
                </div>
                <div>
                  <RowOfCards>
                    {userPlaylists?.items &&
                      userPlaylists?.items.map((e, i) =>
                        i < 8 ? (
                          <CardItem key={e.id} album={e} onClick={() => navigate(`/playlist/${e.id}`)}></CardItem>
                        ) : (
                          ''
                        )
                      )}
                  </RowOfCards>
                </div>
              </div>
              <div className={styles.subblockContainer}>
                <div className={styles.blockHeader + ' ' + styles.withoutVisibility}>
                  <h2>{'Following'}</h2>
                  <p
                    className={styles.showAll}
                    style={{
                      display:
                        followedArtists?.artists.items && followedArtists?.artists.items.length > 8
                          ? 'inline-block'
                          : 'none',
                    }}
                    onClick={() => navigate('following')}
                  >
                    {' '}
                    {t('showAll')}
                  </p>
                </div>
                <div>
                  <RowOfCards>
                    {followedArtists?.artists.items &&
                      followedArtists.artists.items.map((e, i) =>
                        i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : ''
                      )}
                  </RowOfCards>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="following"
        element={
          <div className={styles.detailsProfileContainer}>
            <h2 className={styles.pageHeader}>Following</h2>
            <div className={styles.cardsContainer}>
              {followedArtists?.artists.items &&
                followedArtists?.artists?.items.map(e => <CardArtist key={e.id} artist={e}></CardArtist>)}
            </div>
          </div>
        }
      />
      <Route
        path="playlists"
        element={
          <div className={styles.detailsProfileContainer}>
            <h2 className={styles.pageHeader}>Public Playlists</h2>
            <div className={styles.cardsContainer}>
              {userPlaylists?.items && userPlaylists?.items.map(e => <CardItem key={e.id} album={e}></CardItem>)}
            </div>
          </div>
        }
      />
    </Routes>
  );
};
