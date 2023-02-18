import { t } from "i18next";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { RowOfCards } from "../../components/RowOfCards/RowOfCards";
import { TrackRow } from "../../components/Track/TrackRow";
import commonstyle from './search.module.less';
import style from './searchAll.module.less';
import { useTranslation } from 'react-i18next';

export const SearchAll: FC<{items: SpotifyApi.SearchResponse | undefined}> = props => {
  const { t} = useTranslation();

  function getTopResult(items: SpotifyApi.SearchResponse | undefined) {
    /*let key : keyof SpotifyApi.SearchResponse;
    for (key in items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        if (items) {
          const objects = items[key]?.items;
          if (Object.hasOwnProperty.call(objects![0], 'popularity')) {
            //if (objects && typeof objects[0] === 'object' && 'popularity' in objects) {
            //objects && Math.max(...objects.map(o => o.popularity))
          }
        }
      }
    }*/
    if (items?.tracks?.items[0]) {
      return  items?.tracks?.items.reduce((prev, current) => (prev.popularity > current.popularity) ? prev : current);
    }
  }

  const navigate = useNavigate();

  useEffect(()=> {
    getTopResult(props.items);
  }, []);

  return(
    <div className={commonstyle.searchBody}>
      <div className={style.hat}>
        <section className={style.topResultContainer}>
          <h2 className={style.header}>{t('topResult')}</h2>
          <div className={style.topResult}>
            <img className={style.topResult__image} src={'#'} alt="#" />
            <div className={style.topResult__content}>
              <a href="#"></a>
              <span></span>
            </div>
          </div>
        </section>
        <section className={style.songsBlockContainer}>
          <h2 className={style.header}>{t('upSongs')}</h2>
          <div className={style.songsBlock}>
            <div>
              {props.items?.tracks?.items.map((e, i) => i < 4 ? <TrackRow album={false} track={e}></TrackRow> : '')}
            </div>
          </div>
        </section>
      </div>
        {<RowOfCards title={'Albums'}>{props.items?.albums?.items.map((e, i) => i < 8 ? <CardItem key={e.id} album={e}></CardItem> : '')}</RowOfCards>}
        {/* {<RowOfCards title={'Artists'}>{props.items?.artists?.items.map((e, i) => i < 8 ? <CardItem key={e.id} album={e}></CardItem> : '')}</RowOfCards>} */}
        {<RowOfCards title={'Playlists'}>{props.items?.playlists?.items.map((e, i) => i < 8 ? <CardItem key={e.id} album={e} onClick={() => {navigate(`/playlist/${e.id}`)}}></CardItem> : '')}</RowOfCards>}
    </div>
  );
};
