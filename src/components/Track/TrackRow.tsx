import { FC, Fragment, ReactNode } from 'react';
import style from './trackRow.module.less';

const PlayButton: FC = () => {
  return (
    <svg className={style.play} fill="#ffffff" height="24" width="24" viewBox="0 0 24 24">
      <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
    </svg>
  );
};

type TrackPoprs = {
  track: SpotifyApi.TrackObjectFull | null;
  children?: ReactNode;
  album?: boolean;
}

export const TrackRow: FC<TrackPoprs> = ({album = true, ...props}) => {
  const milliseconds = props.track?.duration_ms || 0;
  const time = {
    minutes: parseInt(`${milliseconds / 1000 / 60}`),
    seconds: parseInt(`${(milliseconds / 1000) % 60}`),
  };

  return (
  <div className={style.wrapper}>
    <div className={style.columnPlay}>
      <PlayButton></PlayButton>
    </div>
    <div className={style.columnData}>
      <img className={style.image} src={props.track?.album.images[0].url} alt="img"/>
      <div>
        <span className={style.name}>{props.track?.name}</span>
        <div className={style.artists}>{props.track?.artists.map((e, i, a) => <Fragment key={e.id}>
          <a key={e.id}>
          {e.name}</a>{`${(i !== a.length - 1 ? ', ' : '')}`}
          </Fragment>)}</div>
      </div>
    </div>
    <div className={style.columnAlbum} hidden={!album}>
      {props.track?.album.name}
    </div>
    <div className={style.columnDuration}>
      {time.minutes
      + ':' +
      (String(time.seconds).length == 1 ? '0' +time.seconds: time.seconds)}
    </div>
  </div>);
};
