import 'antd/dist/antd';
import style from './less.module.less';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import { AlbumType } from '../interface/interface';

import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { SideBar } from './components/SideBar/SideBar';
import { Player } from './components/Player/Player';

export default function App() {
  const [token, setToken] = useState('');
  const [albums, setALbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    setToken(hash.substring(1).split('&')[0].split('=')[1]);
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <div className={style.app}>
      <Layout hasSider>
        <SideBar/>
        <Routes>
          <Route path="/" element={<HomePage token={token} albums={albums} setALbums={setALbums}/>} />
          <Route path="album/:id" element={<DetailsAlbumPage token={token} albums={albums} setALbums={setALbums}/>} />
          <Route path="search" element={<SearchPage token={token}/>} />
        </Routes>
        <Footer>
          <Player token={token}/>
        </Footer>
      </Layout>
    </div>
  );
}
