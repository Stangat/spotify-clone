import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtist, getArtistAlbum } from '../../../api/api';
import { ArtistAlbums, ArtistType, ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './likedSongs.module.less';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';


type LikedSongsPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const LikedSongs: React.FC<LikedSongsPageProps> = (props) => {
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
          <HeartFilled className={style.heartFilled}/>
        </div>
        <p className={style.artistName}>Liked Songs</p>
        {/* <p className={style.artistFollowers}>Followers: {artist?.followers.total}</p> */}
      </div>
      {/* <div className={style.artistAlbum}>
        <p className={style.artistFollowers}>Several albums</p>
        <div className={style.cardAlbum}>
          {artistAlbum?.items.map(album => {
            return (
              <Card
                key={album.id}
                hoverable
                style={{
                  maxWidth: 205,
                  margin: '1%',
                  background: '#181818',
                  boxShadow: '0px 0px 5px 0px black',
                  border: 'none',
                  padding: '2%',
                }}
                cover={
                  <img alt={album.label} src={album.images[0].url} style={{ boxShadow: '0px 0px 5px 0px black' }} />
                }
                // onClick={() => {
                //   navigate(`/album/${album.id}`);
                // }}
              >
                <Meta
                  title={<div style={{ color: 'white' }}>{album.name}</div>}
                  description={
                    <div style={{ color: 'white' }}>
                      Date of release: <br />
                      {album.release_date}
                    </div>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};
