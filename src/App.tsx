import 'antd/dist/antd';
import style from './less.module.less';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import { Login } from './pages/LoginPage/LoginPage';
import { DetailsAlbumPage } from './pages/DetailsAlbumPage/DetailsAlbumPage';
import {
  AlbumType,
  PlaylistsType,
  ProfileType,
  ITrackTypes,
  TopArtistsType,
  UserAlbumsType,
} from '../interface/interface';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Settings } from './pages/Settings/Settings';

import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { SideBar } from './components/SideBar/SideBar';
import { Player } from './components/Player/Player';
import { PlaylisPage } from './pages/PlaylistPage/PlaylistPage';
import { ArtistPage } from './pages/ArtistPage/ArtistPage';
import { TopTracksUserPage } from './pages/TopTracksUserPage/TopTracksUserPage';
import { PlaylistTrackPage } from './pages/PlaylistTrackPage/PlaylistTrackPage';
import { LikedSongs } from './pages/LikedSongs/LikedSongs';
import { Library } from './pages/Library/Library';
import { getAlbums, getUserAlbums, getUserPlaylists, getUserTopArtist } from '../api/api';
import { CollectionPlaylists } from './components/CollectionPlaylists/CollectionPlaylists';
import { CollectionArtists } from './components/CollectionArtists/CollectionArtists';
import { CollectionAlbums } from './components/CollectionAlbums/CollectionAlbums';

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
  const [topArtists, setTopArtists] = useState<TopArtistsType | undefined>();
  const [topTracks, setTopTracks] = useState<TopArtistsType | undefined>();
  const [shuffle, setShuffle] = useState(false);
  const [page, setPage] = useState(1);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [userAlbums, setUserAlbums] = useState<UserAlbumsType | undefined>();

  useEffect(() => {
    const hash: any = window.location.hash;
    let token: any = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem: string) => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const LIMIT = 10;
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
  const getTopArtistsUserHandler = async () => {
    const response = await getUserTopArtist({ token: token });
    setTopArtists(response);
  };
  const getTopAlbumsUserHandler = async () => {
    const response = await getUserAlbums({ token: token });
    setUserAlbums(response);
  };

  useEffect(() => {
    if (token) {
      getAlbumsHandler();
      getPlaylistHandler();
      getTopArtistsUserHandler();
      getTopAlbumsUserHandler();
    }
  }, [OFFSET, token]);

  if (!token) {
    return <Login />;
  }
  return (
    <div className={style.app}>
      <Layout hasSider>
        <SideBar />
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
              />
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProfilePage
                topTracks={topTracks}
                setTopTracks={setTopTracks}
                topArtists={topArtists}
                setTopArtists={setTopArtists}
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
            element={<SearchPage token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="collection/*"
            element={
              <CollectionPlaylists
                playlists={playlists}
                token={token}
                setToken={setToken}
                profile={profile}
                setProfile={setProfile}
              />
            }
          />
          <Route
            path="collection/artists"
            element={
              <CollectionArtists
                topArtists={topArtists}
                token={token}
                setToken={setToken}
                profile={profile}
                setProfile={setProfile}
              />
            }
          />
          <Route
            path="collection/albums"
            element={
              <CollectionAlbums
                userAlbums={userAlbums}
                token={token}
                setToken={setToken}
                profile={profile}
                setProfile={setProfile}
              />
            }
          />
          <Route
            path="playlist/:id"
            element={<PlaylisPage setIsPlaying={setIsPlaying} isPlaying={isPlaying} player={player} />}
          />
          <Route
            path="top_tracks"
            element={
              <TopTracksUserPage
                token={token}
                setToken={setToken}
                profile={profile}
                setProfile={setProfile}
                setTopTracks={setTopTracks}
                topTracks={topTracks}
                topArtists={topArtists}
                setTopArtists={setTopArtists}
                playlists={playlists}
                setPlaylists={setPlaylists}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                player={player}
                setSongName={setSongName}
                setArtistName={setArtistName}
                setCoverUrl={setCoverURL}
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
            path="search"
            element={<SearchPage token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
          />
          <Route
            path="collection/tracks"
            element={<LikedSongs token={token} setToken={setToken} profile={profile} setProfile={setProfile} />}
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
          />
        </Footer>
      </Layout>
    </div>
  );
}
