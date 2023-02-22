import { FC, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { getSearchResults, typesOfSearchQuery } from '../../../api/api';
import { SearchAll } from './SearchAll';
import { SearchSongs } from './SearchSongs';
import { CardItem } from '../../components/CardItem/CardItem';
import { CardArtist } from '../../components/CardItem/CardArtist';
import style from './search.module.less';
import { ITrackTypes } from '../../../interface/interface';
import { v4 as uuidv4 } from 'uuid';

type SearchProps = {
  token: string;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  trackId: string;
  setTrackId: (trackId: string) => void;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  setCoverUrl: (coverUrl: string) => void;
  setTrackDuration: (trackDuration: number) => void;
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  setShuffle: (shuffle: boolean) => void;
};

const TYPES: { [key: string]: typesOfSearchQuery[] } = {
  all: ['track', 'playlist', 'album', 'artist'],
  songs: ['track'],
  playlists: ['playlist'],
  albums: ['album'],
  artists: ['artist'],
};

export const Search: FC<SearchProps> = props => {
  const temp = { all: !0, songs: !0, playlists: !0, albums: !0, artists: !0};
  const [items, setItems] = useState<SpotifyApi.SearchResponse>();
  const [currentTag, setCurrentTag] = useState<string>('all');
  const [availableTags, setAvailableTags] = useState<{ [key: string]: boolean }>(temp);
  const { query } = useParams();
  const navigate = useNavigate();

  const getResultOfSearching = async (types?: typesOfSearchQuery[]) => {
    const response = await getSearchResults(props.token, types || TYPES.all, query || '');
    const isAvailable: { [key: string]: boolean } = { all: !0 };
    setItems(response);
    try {
      if (response) {
        let key: keyof typeof response;
        for (key in response) {
          if (!response[key]?.items.length) {
            if (key == 'tracks') {
              isAvailable['songs'] = false;
            } else {
              isAvailable[key] = false;
            }
          } else {
            if (key == 'tracks') {
              isAvailable['songs'] = true;
            } else {
              isAvailable[key] = true;
            }
          }
        }
        setAvailableTags(isAvailable);
      } else {
        setAvailableTags({ all: !0 });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCurrentTag('all');
    const timeOutId = setTimeout(() => getResultOfSearching(), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className={style.wrapper}>
      <div className={style.tags}>
        {Object.keys(TYPES).map(e => {
          return (
            <span
              style={{ display: `${!availableTags[e] ? 'none' : 'inline-block'}` }}
              className={style.searchTag + `${currentTag === e ? ' ' + style.activeTag : ''}`}
              onClick={() => {
                setCurrentTag(e);
                e === 'all' ? navigate('') : navigate(e);
              }}
              key={e}
            >
              {e}
            </span>
          );
        })}
      </div>
      <Routes>
        <Route
          path="/*"
          element={
            <SearchAll
              token={props.token}
              items={items}
              isAvailable={availableTags}
              isPlaying={props.isPlaying}
              setIsPlaying={props.setIsPlaying}
              player={props.player}
              trackId={props.trackId}
              setTrackId={props.setTrackId}
              setSongName={props.setSongName}
              setArtistName={props.setArtistName}
              setCoverUrl={props.setCoverUrl}
              setTrackDuration={props.setTrackDuration}
              setAlbumTracks={props.setAlbumTracks}
              setShuffle={props.setShuffle}
            ></SearchAll>
          }
        />
        <Route
          path="/songs"
          element={
            <SearchSongs
              token={props.token}
              items={items}
              isPlaying={props.isPlaying}
              setIsPlaying={props.setIsPlaying}
              player={props.player}
              trackId={props.trackId}
              setTrackId={props.setTrackId}
              setSongName={props.setSongName}
              setArtistName={props.setArtistName}
              setCoverUrl={props.setCoverUrl}
              setTrackDuration={props.setTrackDuration}
              setAlbumTracks={props.setAlbumTracks}
              setShuffle={props.setShuffle}
            ></SearchSongs>
          }
        />
        <Route
          path="/playlists"
          element={
            <div className={style.cardsContainer}>
              {items?.playlists &&
                items?.playlists.items.map(e => (
                  <CardItem
                    key={e.id}
                    album={e}
                    onClick={() => {
                      navigate(`/playlist/${e.id}`);
                    }}
                  />
                ))}
            </div>
          }
        />
        <Route
          path="/albums"
          element={
            <div className={style.cardsContainer}>
              {items?.albums?.items.map(e => (
                <CardItem key={e.id} album={e}></CardItem>
              ))}
            </div>
          }
        />
        <Route
          path="/artists"
          element={
            <div className={style.cardsContainer}>
              {items?.artists?.items.map(e => (
                <CardArtist key={e.id} artist={e}></CardArtist>
              ))}
            </div>
          }
        />
      </Routes>
    </div>
  );
};
