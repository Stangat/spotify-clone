// import { PlaylistsType } from '../../../../interface/interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getUserLikedTracksSpotifyApi, getUserPlaylistsSpotifyApi } from '../../../../api/api';
import { CardItem } from '../../../components/CardItem/CardItem';
import style from './collectionPlaylists.module.less';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


type CollectionPlaylistsProps = {
  // playlists: PlaylistsType | undefined;
  token: string;
};

export const CollectionPlaylists: React.FC<CollectionPlaylistsProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userPlaylists, setUserPlaylists] = useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>();
  const [userLikes, setUserLikes] = useState<SpotifyApi.UsersSavedTracksResponse>();
  const [readyFlag, setReadyFlag] = useState<boolean>(false);
  const token = localStorage.getItem('token') || props.token;
  const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;

  const  getUserData = async () => {
    const response = await getUserPlaylistsSpotifyApi(token);
    const likes = await getUserLikedTracksSpotifyApi(token);
    setUserPlaylists(response);
    setUserLikes(likes);
    setReadyFlag(!0);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!readyFlag) return (<Spin indicator={antIcon} style={{width: '100%', height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center',}}></Spin>)

  return (
    <div className={style.wrapper}>
      <div className={style.mainBlock}>
        <span className={style.title}>{t('playlists')}</span>
        <div className={style.blockView}>
          <div className={style.likedBlock} onClick={() => navigate('../tracks')}>
            <div className={style.likedBlockTrackListContainer}>
              <div className={style.likedBlockTrackList}>
              {userLikes?.items.map((e, i) => {
                return <span key={i} className={style.likeContainer}>
                  <span className={style.likeTrackPoint}>{!i ? '' : ' • '}</span>
                  <span className={style.likeTrackAuthor}>{e.track.artists[0].name}</span>
                  <span className={style.likeTrack}>{e.track.name}</span>
                </span>
              })}
              </div>
            </div>
            <div className={style.likedBlockBottom}>
              <span className={style.likedBlockTitle}>{t('liked')}</span>
              <div>{userLikes?.total} liked songs</div>
            </div>
          </div>
          {userPlaylists?.items.map(e => <CardItem key={e.id} onClick={() => {navigate(`/playlist/${e.id}`)}} album={e}></CardItem>)}
        </div>
      </div>
    </div>
  );
};
