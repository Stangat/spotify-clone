import style from './less.module.less';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
// import { AlbumType, ITrackTypes } from '../interface/interface';
import { AlbumType, PlaylistsType, ProfileType, ITrackTypes } from '../interface/interface';
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
  const [albumTracks, setAlbumTracks] = useState<ITrackTypes[]>([]);
  const [profile, setProfile] = useState<ProfileType>();
  const [playlists, setPlaylists] = useState<PlaylistsType>();

  useEffect(() => {
    const hash: any = window.location.hash;
    let token: any = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem: any) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  return (
    <div className={style.app}>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <HomePage
                setToken={setToken}
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
                albumTracks={albumTracks}
                setAlbumTracks={setAlbumTracks}
                trackId={trackId}
                setTrackId={setTrackId}
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="album/:id"
          element={
            token ? (<DetailsAlbumPage
              setToken={setToken}
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
              albumTracks={albumTracks}
              setAlbumTracks={setAlbumTracks}
            />) : (
              <Login />
            )
          }
        />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="profile/:id"
          element={
            token ? (<ProfilePage
              setToken={setToken}
              profile={profile}
              setProfile={setProfile}
              playlists={playlists}
              setPlaylists={setPlaylists}
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
              albums={albums}
              albumTracks={albumTracks}
              setAlbumTracks={setAlbumTracks}
              trackId={trackId}
              setTrackId={setTrackId}
            />) : (
              <Login />
            )
          }
        />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
