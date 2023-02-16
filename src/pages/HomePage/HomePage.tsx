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
  page:number,
  setPage:(page:number)=>void
  totalAlbums: number,
  setTotalAlbums:(totalAlbums: number)=>void
};



export const HomePage: React.FC<HomePageProps> = props => {



  return (
    <div>      
      <HeaderHome
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
        setToken={props.setToken}
        page={props.page}
        setPage={props.setPage}
        totalAlbums={props.totalAlbums}
      />
      <HomeContent
        token={props.token}
        totalAlbums={props.totalAlbums}
        setTotalAlbums={props.setTotalAlbums}
        albums={props.albums}
        setALbums={props.setALbums}
      />
    </div>
  );
};
