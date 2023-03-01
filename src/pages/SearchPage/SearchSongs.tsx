import { FC } from 'react';
import { ITrackTypes } from '../../../interface/interface';
import { TrackRow } from '../../components/Track/TrackRow';
import style from './searchSongs.module.less';
import { useTranslation } from 'react-i18next';

type SearchSongsProps = {
  token: string;
  items: SpotifyApi.SearchResponse | undefined;
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
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
  uniqueTracks: SpotifyApi.TrackObjectFull[];
};

const timeSvg = () => {
  return (
    <svg role="img" height="16" width="16" aria-hidden="true" fill="#cecece" viewBox="0 0 16 16">
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
      <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
    </svg>
  );
};

export const SearchSongs: FC<SearchSongsProps> = props => {
  const { t } = useTranslation();
  const FIELDS = ['#', `${t('TITLE')}`, `${t('ALBUM')}`, timeSvg()];

  return (
    <div className={style.searchBody}>
      <div className={style.tracksHeader}>
        {FIELDS.map((e, i) => (
          <div key={i} className={style['column' + i]}>
            {e}
          </div>
        ))}
      </div>
      <div className={style.songsContainer}>
        {props.uniqueTracks.map(e =>
          e.preview_url ? (
            <TrackRow
              key={e.id}
              track={e}
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
              uniqueTracks={props.uniqueTracks}
              likedSong={props.likedSong}
              setLikedSong={props.setLikedSong}
            ></TrackRow>
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};
