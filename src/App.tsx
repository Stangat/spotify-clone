import style from './less.module.less';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import { AlbumType, ProfileType } from '../interface/interface';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Settings } from './pages/Settings/Settings';

export default function App() {
  const [token, setToken] = useState('');
  const [albums, setALbums] = useState<AlbumType[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player] = useState(new Audio());
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [coverUrl, setCoverURL] = useState('');
  const [trackDuration, setTrackDuration] = useState(0);
  const [trackId, setTrackId] = useState('');
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    const hash = window.location.hash;
    setToken(hash.substring(1).split('&')[0].split('=')[1]);
  }, []);

  return (
    <div className={style.app}>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <HomePage
                profile={profile}
                setProfile={setProfile}
                token={token}
                albums={albums}
                setALbums={setALbums}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                player={player}
                songName={songName}
                artistName={artistName}
                setSongName={setSongName}
                setArtistName={setArtistName}
                coverUrl={coverUrl}
                setCoverUrl={setCoverURL}
                trackDuration={trackDuration}
                setTrackDuration={setTrackDuration}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="album/:id"
          element={
            <DetailsAlbumPage
              profile={profile}
              setProfile={setProfile}
              token={token}
              albums={albums}
              setALbums={setALbums}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              player={player}
              songName={songName}
              artistName={artistName}
              setSongName={setSongName}
              setArtistName={setArtistName}
              coverUrl={coverUrl}
              setCoverUrl={setCoverURL}
              trackDuration={trackDuration}
              setTrackDuration={setTrackDuration}
              trackId={trackId}
              setTrackId={setTrackId}
            />
          }
        />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="profile/:id"
          element={
            <ProfilePage
              profile={profile}
              setProfile={setProfile}
              token={token}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              player={player}
              songName={songName}
              artistName={artistName}
              setSongName={setSongName}
              setArtistName={setArtistName}
              coverUrl={coverUrl}
              setCoverUrl={setCoverURL}
              trackDuration={trackDuration}
              setTrackDuration={setTrackDuration}
            />
          }
        />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
