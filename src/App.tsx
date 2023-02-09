import style from './less.module.less';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import { AlbumType } from '../interface/interface';

export default function App() {
  const [token, setToken] = useState('');
  const [albums, setALbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    setToken(hash.substring(1).split('&')[0].split('=')[1]);
  }, []);

  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={token ? <HomePage token={token} albums={albums} setALbums={setALbums}/> : <Login />} />
        <Route path="album/:id" element={<DetailsAlbumPage token={token} albums={albums} setALbums={setALbums}/>} />
        <Route path="search" element={<SearchPage token={token}/>} />
      </Routes>
    </div>
  );
}
