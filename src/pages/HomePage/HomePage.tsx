import React, { useState } from 'react';
import { AlbumType, ProfileType } from '../../../interface/interface';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';

type HomePageProps = {
  token: string;
  setToken: (token:string)=>void
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

const LIMIT = 10;

export const HomePage: React.FC<HomePageProps> = props => {
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);

  return (
    <div>      
      <HeaderHome
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
        setToken={props.setToken}
        page={page}
        setPage={setPage}
        totalAlbums={totalAlbums}
      />
      <HomeContent
        token={props.token}
        offset={(page - 1) * LIMIT}
        limit={LIMIT}
        totalAlbums={totalAlbums}
        setTotalAlbums={setTotalAlbums}
        albums={props.albums}
        setALbums={props.setALbums}
      />
    </div>
  );
};
