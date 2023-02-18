import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { getSearchResults, typesOfSearchQuery } from "../../../api/api";
import { SearchAll } from "./SearchAll";
import { SearchSongs } from "./SearchSongs";
import { CardItem } from "../../components/CardItem/CardItem";
import { CardArtist } from "../../components/CardItem/CardArtist";
import style from './search.module.less';

type SearchProps = {
  token: string;
};

const TYPES: {[key: string]: typesOfSearchQuery[]} = {
  all: ['track', 'playlist', 'album', 'artist'],
  songs: ['track'],
  playlists: ['playlist'],
  albums: ['album'],
  artists: ['artist'],
}

export const Search: FC<SearchProps> = props => {
  const [items, setItems] = useState<SpotifyApi.SearchResponse>();
  const [currentTag, setCurrentTag] = useState<string>('all');
  const [availableTags, setAvailableTags] = useState<{[key: string] : boolean}>({all: !0});
  const { query } = useParams(); 
  const navigate = useNavigate();
  
  const getResultOfSearching = async (types?: typesOfSearchQuery[]) => {
    const response = await getSearchResults(props.token, types || TYPES.all, query || '');
    const isAvailable: {[key: string] : boolean} = {all: !0};

    setItems(response);
    try {
      if (response) {
        let key: keyof typeof response;
        for (key in response) {
          if (!(response[key]?.items.length)) {
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
        setAvailableTags(isAvailable)
      } else {
        setAvailableTags({all: !0})
      }
    } catch(err) {
      console.log(err);
    }
  };

  // TODO так закидывать запросами нельзя, наверное

  useEffect(() => {
    const timeOutId = setTimeout(() => getResultOfSearching(), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return(
    <div className={style.wrapper}>
      <div className={style.tags}>
        {Object.keys(TYPES).map((e) => {
          return <span
          style={{display: `${!availableTags[e] ? 'none' : 'inline-block' }`}}
          className={style.searchTag + `${currentTag  === e ? ' ' + style.activeTag : ''}`} 
          onClick={() => {
            setCurrentTag(e);
            e === 'all' ? navigate('') : navigate(e)}
          }
          key={e}>{e}</span>
        })}
      </div>
      <Routes>
        <Route path="/" element={<SearchAll items={items}></SearchAll>}/>
        <Route path="/songs" element={<SearchSongs items={items}></SearchSongs>}/>
        <Route path="/playlists" element={
          <div className={style.cardsContainer}>
            {items?.playlists && items?.playlists.items.map(e => <CardItem key={e.id} album={e} onClick={() => {(navigate(`/playlist/${e.id}`))}}/>)}
          </div>}/>
        <Route path="/albums" element={
          <div className={style.cardsContainer}>
            {items?.albums?.items
              .map(e => <CardItem key={e.id} album={e}></CardItem>)}
          </div>}/>
          <Route path="/artists" element={
          <div className={style.cardsContainer}>
            {items?.artists?.items
            .map(e => <CardArtist key={e.id} artist={e}></CardArtist>)}
          </div>}/>
      </Routes>
    </div>
  );
};
