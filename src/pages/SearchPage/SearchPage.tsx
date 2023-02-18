import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCategories } from "../../../api/api";
import { CategoryContent } from "../../components/CategoryContent/CategoryContent";
import { CustomHeader } from "../../components/Header/CustomHeader";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import { Search } from "./Search";
import { ProfileType } from "../../../interface/interface";
import style from './search.module.less';
import { useTranslation } from 'react-i18next';

const searchIcon = () => {
  return (<svg role="img" height="24" width="24" aria-hidden="true" className={style.searchIcon} viewBox="0 0 24 24" data-encore-id="icon">
      <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>);
}

type SearchProps = {
  token: string;
  setToken: (token:string)=>void
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const SearchPage: FC<SearchProps> = props => {
  const { t} = useTranslation();
  const [categories, setCategories] = useState<SpotifyApi.PagingObject<SpotifyApi.CategoryObject>>(); 
  const navigate = useNavigate();

  const getBrowseByCategories = async () => {
    const res = await getCategories(props.token);
    setCategories(res);
  }

  function trackChangingOfInput (e: React.ChangeEvent<HTMLInputElement>) {
    navigate(e.target.value)
  }

  useEffect(() => {
    getBrowseByCategories();
  }, []);

  return (
    <div className={style.wrapper}>
      <CustomHeader profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken}>
        <div className={style.searchContainer}>
          <input className={style.search} type="text" onChange={trackChangingOfInput} placeholder="What do you want to listen to?"/>
          {searchIcon()}
        </div>
      </CustomHeader>
      <main className={style.main}>
        <Routes>
          <Route path="/" element={
            <div className={style.searchBody}>
              <div className={style.searchHeader}><h2>{t('browse')}</h2></div>
                {categories && categories.items.map((e : SpotifyApi.CategoryObject) => {
                  return <GenreCard key={e.id} item={e}/>;
                })}
            </div>}>
          </Route>
          <Route path="category/:id" element={<CategoryContent token={props.token}/>}></Route>
          <Route path="/:query/*" element={<Search token={props.token}></Search>}></Route>
        </Routes>
      </main>
    </div>);
};
