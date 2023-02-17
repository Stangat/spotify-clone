import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtist, getArtistAlbum } from '../../../api/api';
import { ArtistAlbums, ArtistType, ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './likedSongs.module.less';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import { TopTracksBlock } from '../../components/TopTracksBlock/TopTracksBlock';

type LikedSongsPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const LikedSongs: React.FC<LikedSongsPageProps> = props => {
  const timeSvg = () => {
    return (
      <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
        <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
      </svg>
    );
  };

  const FIELDS = ['#', 'TITLE', 'ALBUM', timeSvg()];

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
        <p className={style.artistName}>Liked Songs</p>
      </div>
      <div className={style.tracksHeader}>
        {FIELDS.map((e, i) => (
          <div key={i} className={style['column' + i]}>
            {e}
          </div>
        ))}
      </div>
      
    </div>
  );
};
