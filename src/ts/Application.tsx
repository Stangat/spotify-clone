// import { Routes, Route, Router } from 'react-router-dom';
import style from '../less/main-page.module.less';
import 'antd/dist/antd';
import { Login } from './components/Login';
import { useState, useEffect } from 'react';
import { MainPage } from './components/MainPage';

export default function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    setToken(hash.substring(1).split('&')[0].split('=')[1]);
  }, []);

  return <div className={style.mainContainer}>{token ? <MainPage token={token} /> : <Login />}</div>;
}
