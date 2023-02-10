import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { AlbumType } from '../../../interface/interface';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';
import { Player } from '../../components/Player/Player';
import { SideBar } from '../../components/SideBar/SideBar';

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0',
  padding: '15px',
  color: '#fff',
  backgroundColor: '#1c1b1b',
  borderTop: '1px solid #302f2f',
};

type HomePageProps = {
  token: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
};

const limit = 10;
export const HomePage: React.FC<HomePageProps> = props => {
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);

  return (
    <Layout hasSider>
      <Layout>
        <SideBar />
        <Layout>
          <HeaderHome page={page} setPage={setPage} totalAlbums={totalAlbums} />
          <HomeContent
            token={props.token}
            offset={(page - 1) * limit}
            limit={limit}
            totalAlbums={totalAlbums}
            setTotalAlbums={setTotalAlbums}
            albums={props.albums}
            setALbums={props.setALbums}
          />
        </Layout>
      </Layout>
      <Footer style={footerStyle}>
        <Player
          token={props.token}
          setIsPlaying={props.setIsPlaying}
          isPlaying={props.isPlaying}
          player={props.player}
          songName={props.songName}
          artistName={props.artistName}
          setSongName={props.setSongName}
          setArtistName={props.setArtistName}
          coverUrl={props.coverUrl}
        />
      </Footer>
    </Layout>
  );
};
