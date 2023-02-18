import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardItem } from "../../components/CardItem/CardItem";
import { RowOfCards } from "../../components/RowOfCards/RowOfCards";
import { TrackRow } from "../../components/Track/TrackRow";
import { useTranslation } from 'react-i18next';
import { CardArtist } from "../../components/CardItem/CardArtist";
import commonstyle from './search.module.less';
import style from './searchAll.module.less';

export const SearchAll: FC<{items: SpotifyApi.SearchResponse | undefined}> = props => {
  const { t } = useTranslation();
  const [topResult, setTopResult] = useState<SpotifyApi.ArtistObjectFull>();

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
    if (items?.albums?.items[0]) {
      setTopResult(items.artists?.items.reduce((prev, current) => (prev.popularity > current.popularity) ? prev : current) || items.artists?.items[0]);
    }
  }

  const navigate = useNavigate();
  const link = topResult?.images[0] && topResult?.images[0].url;

  useEffect(()=> {
    getTopResult(props.items);
  });

  return(
    <div className={commonstyle.searchBody}>
      <div className={style.hat}>
        <section className={style.topResultContainer}>
          <h2 className={style.header}>{t('topResult')}</h2>
          <div className={style.topResult}>
            <div className={style.topResult__image} style={{
              backgroundImage: `url(${link || ''})`,
            }}> </div>
            <div className={style.topResult__content}>
              <a href={`/${topResult?.type}/${topResult?.id}`}>{topResult?.name}</a>
              <div><span>{topResult?.type}</span></div>
            </div>
          </div>
        </section>
        <section className={style.songsBlockContainer}>
          <h2 className={style.header}>{t('upSongs')}</h2>
          <div className={style.songsBlock}>
            <div>
              {props.items?.tracks?.items.map((e, i) => i < 4 ? <TrackRow key={e.id} album={false} track={e}></TrackRow> : '')}
            </div>
          </div>
        </section>
      </div>
        {<RowOfCards title={'Albums'}>{props.items?.albums?.items.map((e, i) => i < 8 ? <CardItem key={e.id} album={e}></CardItem> : '')}</RowOfCards>}
        {<RowOfCards title={'Artists'}>{props.items?.artists?.items.map((e, i) => i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : '')}</RowOfCards>}
        {<RowOfCards title={'Playlists'}>{props.items?.playlists?.items.map((e, i) => i < 8 ? <CardItem key={e.id} album={e} onClick={() => {navigate(`/playlist/${e.id}`)}}></CardItem> : '')}</RowOfCards>}
    </div>
  );
};
