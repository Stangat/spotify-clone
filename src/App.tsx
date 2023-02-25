import 'antd/dist/antd';
import style from './less.module.less';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import { AlbumType, PlaylistsType, ProfileType, ITrackTypes, TopArtistsType } from '../interface/interface';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Settings } from './pages/Settings/Settings';

import { ConfigProvider, Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { SideBar } from './components/SideBar/SideBar';
import { Player } from './components/Player/Player';
import { PlaylisPage } from './pages/PlaylistPage/PlaylistPage';
import { ArtistPage } from './pages/ArtistPage/ArtistPage';
import { TopTracksUserPage } from './pages/TopTracksUserPage/TopTracksUserPage';
import { LikedSongs } from './pages/LikedSongs/LikedSongs';
import { getAlbums, getUserPlaylists } from '../api/api';

import { useTranslation } from 'react-i18next';
import { Library } from './pages/Library/Library';

export default function App() {
  const { t, i18n } = useTranslation();

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
  const [topTracks, setTopTracks] = useState<SpotifyApi.UsersTopTracksResponse | undefined>();
  const [shuffle, setShuffle] = useState(false);
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [likedSong, setLikedSong] = useState<boolean>();

  useEffect(() => {
    const hash: string = window.location.hash;
    let token: string | null = window.localStorage.getItem('token');

    if (!token && hash) {
      token =
        hash
          .substring(1)
          .split('&')
          .find((elem: string) => elem.startsWith('access_token'))
          ?.split('=')[1] || '';
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token || '');
  }, []);

  const LIMIT = 16;
  const OFFSET = (page - 1) * LIMIT;
  const getAlbumsHandler = async () => {
    const response = await getAlbums({ limit: LIMIT, offset: OFFSET, token: token });
    setALbums(response.albums.items);
    setTotalAlbums(response.albums.total);
  };
  const getPlaylistHandler = async () => {
    const response = await getUserPlaylists({ token: token });
    setPlaylists(response);
  };
  useEffect(() => {
    if (token) {
      getAlbumsHandler();
      getPlaylistHandler();
    }
  }, [OFFSET, token]);

  if (!token) {
    return <Login />;
  }

  return (
    <ConfigProvider theme={{ token: { fontFamily: `'Inter', sans-serif !important` } }}>
      <div className={style.app}>
        <Layout hasSider style={{ width: '100%' }}>
          <SideBar playlists={playlists} />
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
                    page={page}
                    setPage={setPage}
                    totalAlbums={totalAlbums}
                    setTotalAlbums={setTotalAlbums}
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
                  shuffle={shuffle}
                  setShuffle={setShuffle}
                  likedSong={likedSong}
                  setLikedSong={setLikedSong}
                />
              }
            />
            <Route
              path="profile/:id/*"
              element={
                <ProfilePage
                  topTracks={topTracks}
                  setTopTracks={setTopTracks}
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
                  shuffle={shuffle}
                  setShuffle={setShuffle}
                />
              }
            />
            <Route
              path="artist/:id"
              element={<ArtistPage token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
            />
            <Route
              path="settings"
              element={<Settings token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
            />
            <Route
              path="search/*"
              element={
                <SearchPage
                  token={token}
                  setToken={setToken}
                  profile={profile}
                  setProfile={setProfile}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  player={player}
                  trackId={trackId}
                  setTrackId={setTrackId}
                  setSongName={setSongName}
                  setArtistName={setArtistName}
                  setCoverUrl={setCoverURL}
                  setTrackDuration={setTrackDuration}
                  setAlbumTracks={setAlbumTracks}
                  setShuffle={setShuffle}
                  likedSong={likedSong}
                  setLikedSong={setLikedSong}
                />
              }
            />
            <Route
              path="collection/*"
              element={<Library token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
            />
            <Route
              path="playlist/:id/*"
              element={
                <PlaylisPage
                  setIsPlaying={setIsPlaying}
                  isPlaying={isPlaying}
                  player={player}
                  trackId={trackId}
                  setTrackId={setTrackId}
                  setSongName={setSongName}
                  setArtistName={setArtistName}
                  setCoverUrl={setCoverURL}
                  setTrackDuration={setTrackDuration}
                  setAlbumTracks={setAlbumTracks}
                  setShuffle={setShuffle}
                  likedSong={likedSong}
                  setLikedSong={setLikedSong}
                />
              }
            />
            <Route
              path="profile/:id/tracks"
              element={
                <TopTracksUserPage
                  token={token}
                  setToken={setToken}
                  profile={profile}
                  setProfile={setProfile}
                  setTopTracks={setTopTracks}
                  topTracks={topTracks}
                  setIsPlaying={setIsPlaying}
                  isPlaying={isPlaying}
                  player={player}
                  setSongName={setSongName}
                  setArtistName={setArtistName}
                  setCoverUrl={setCoverURL}
                  trackDuration={trackDuration}
                  setTrackDuration={setTrackDuration}
                  setAlbumTracks={setAlbumTracks}
                  trackId={trackId}
                  setTrackId={setTrackId}
                  setShuffle={setShuffle}
                  likedSong={likedSong}
                  setLikedSong={setLikedSong}
                />
              }
            />
            <Route
              path="collection/tracks"
              element={
                <LikedSongs
                  token={token}
                  setToken={setToken}
                  profile={profile}
                  setProfile={setProfile}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  player={player}
                  trackId={trackId}
                  setTrackId={setTrackId}
                  setSongName={setSongName}
                  setArtistName={setArtistName}
                  setCoverUrl={setCoverURL}
                  setTrackDuration={setTrackDuration}
                  setAlbumTracks={setAlbumTracks}
                  setShuffle={setShuffle}
                  likedSong={likedSong}
                  setLikedSong={setLikedSong}
                />
              }
            />
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
              shuffle={shuffle}
              setShuffle={setShuffle}
              likedSong={likedSong}
              setLikedSong={setLikedSong}
            />
          </Footer>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
