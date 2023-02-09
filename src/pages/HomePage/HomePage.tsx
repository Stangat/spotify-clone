import React, { useState } from 'react';
import { AlbumType } from '../../../interface/interface';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';

type HomePageProps = {
  token: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

const LIMIT = 10;

export const HomePage: React.FC<HomePageProps> = props => {
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);

  return (
    <div>
      <HeaderHome page={page} setPage={setPage} totalAlbums={totalAlbums} />
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
