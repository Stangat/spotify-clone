import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { getSearchResults, typesOfSearchQuery } from "../../../api/api";
import { SearchAll } from "./SearchAll";
import { SearchSongs } from "./SearchSongs";
import { CardItem } from "../../components/CardItem/CardItem";
import style from './search.module.less';
import { useTranslation } from "react-i18next";
import { CardArtist } from "../../components/CardItem/CardArtist";

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
  const { t } = useTranslation();
  const [items, setItems] = useState<SpotifyApi.SearchResponse>();
  const { query } = useParams(); 
  const navigate = useNavigate();

  const getResultOfSearching = async (types?: typesOfSearchQuery[]) => {
    const response = await getSearchResults(props.token, types || TYPES.all, query || '');
    setItems(response);
  };

  // TODO так закидывать запросами нельзя, наверное

  useEffect(() => {
    getResultOfSearching();
  }, [query]);

  return(
    <div className={style.wrapper}>
      <div className={style.tags}>
        {Object.keys(TYPES).map((e) => {
          return <span className={style.searchTag} 
          onClick={() => e === 'all' ? navigate('') : navigate(e)}
          key={e}>{e}</span>
        })}
      </div>
      <Routes>
        <Route path="/" element={<SearchAll key={'sa' + query} items={items}></SearchAll>}/>
        <Route path="/songs" element={<SearchSongs key={'ss' + query} items={items}></SearchSongs>}/>
        <Route path="/playlists" element={
          <div className={style.cardsContainer}>
            {items?.playlists && items?.playlists.items.map(e => <CardItem key={e.id} album={e} onClick={() => {navigate(`/playlist/${e.id}`)}}/>)}
          </div>}/>
        <Route path="/albums" element={
          <div className={style.cardsContainer}>
            {items?.albums?.items
              .map(e => <CardItem key={e.id} album={e}></CardItem>)}
          </div>}/>
          <Route path="/artists" element={
          <div className={style.cardsContainer}>
            {items?.artists?.items
            .map(e => <CardArtist artist={e}></CardArtist>)}
          </div>}/>
      </Routes>
    </div>
  );
};
