import style from './less.module.less';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    setToken(hash.substring(1).split('&')[0].split('=')[1]);
  }, []);
  
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={token ? <HomePage token={token} /> : <Login />} />
        <Route path="*" element={<SearchPage />} />
      </Routes>
    </div>
  );
}