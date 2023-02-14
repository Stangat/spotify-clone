import 'antd/dist/antd';
import style from './less.module.less';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import { AlbumType, PlaylistsType, ProfileType, ITrackTypes } from '../interface/interface';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Settings } from './pages/Settings/Settings';

import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { SideBar } from './components/SideBar/SideBar';
import { Player } from './components/Player/Player';
import { GenrePage } from './pages/GenrePage/GenrePage';

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

  if (!token) {
    return <Login />;
  }

  return (
    <div className={style.app}>
      <Layout hasSider>
        <SideBar/>
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
                setToken={setToken}
                profile={profile}
                setProfile={setProfile}
                token={token}
                albums={albums}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                player={player}
                songName={songName}
                artistName={artistName}
                setSongName={setSongName}
                setArtistName={setArtistName}
                setCoverUrl={setCoverURL}
                trackDuration={trackDuration}
                setTrackDuration={setTrackDuration}
                trackId={trackId}
                setTrackId={setTrackId}
                albumTracks={albumTracks}
                setAlbumTracks={setAlbumTracks}
              />
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProfilePage
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
                albums={albums}
                trackDuration={trackDuration}
                setTrackDuration={setTrackDuration}
                albumTracks={albumTracks}
                setAlbumTracks={setAlbumTracks}
                trackId={trackId}
                setTrackId={setTrackId}
              />
            }
          />
          <Route path="settings" element={<Settings />} />
          <Route path="search/*" element={<SearchPage token={token}/>} />
          <Route path="genre/*" element={<GenrePage />} />
      </Routes>
        <Footer>
          <Player
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
          />
        </Footer>
      </Layout>
    </div>
  );
}
