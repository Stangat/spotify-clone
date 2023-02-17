import { FC } from "react";
import { TrackRow } from "../../components/Track/TrackRow";
import { FIELDS } from "../PlaylistPage/PlaylistPage";
import style from './searchSongs.module.less';


export const SearchSongs: FC<{items: SpotifyApi.SearchResponse | undefined}> = props => {
  return (
    <div className={style.searchBody}>
        <div className={style.tracksHeader}>
          {FIELDS.map((e, i) => <div key={i} className={style['column' + i]}>{e}</div>)}
        </div>
        <div className={style.songsContainer}>
          {props.items?.tracks?.items.map(e => <TrackRow track={e}></TrackRow>)}
        </div>
    </div>
  );
};
