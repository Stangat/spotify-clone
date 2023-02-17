import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { getSearchResults, typesOfSearchQuery } from "../../../api/api";
import style from './search.module.less';
import { SearchAll } from "./SearchAll";

type SearchProps = {
  token: string;
};

const TYPES: {[key: string]: typesOfSearchQuery[]} = {
  all: ['track', 'playlist', 'album', 'artist'],
  song: ['track'],
  playlist: ['playlist'],
  albums: ['album'],
  artists: ['artist'],
}

export const Search: FC<SearchProps> = props => {
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
    console.log(items);
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
        <Route path="/" element={<SearchAll items={items}></SearchAll>}/>
      </Routes>
    </div>
  );
};
