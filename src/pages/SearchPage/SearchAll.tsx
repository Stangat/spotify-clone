import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSearchResults } from '../../../api/api';
import { ITrackTypes } from '../../../interface/interface';
import { CardItem } from '../../components/CardItem/CardItem';
import { RowOfCards } from '../../components/RowOfCards/RowOfCards';
import { TrackRow } from '../../components/Track/TrackRow';
import commonstyle from './search.module.less';
import style from './searchAll.module.less';
import { useTranslation } from 'react-i18next';
import { CardArtist } from '../../components/CardItem/CardArtist';

type SearchAllProps = {
  token?: string;
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
  isAvailable: { [key: string]: boolean };
  uniqueTracks: SpotifyApi.TrackObjectFull[];
};

export const SearchAll: React.FC<SearchAllProps> = props => {
  const { t } = useTranslation();
  const [topResult, setTopResult] = useState<SpotifyApi.ArtistObjectFull>();

  function getTopResult(items: SpotifyApi.SearchResponse | undefined) {
    if (items?.artists?.items[0]) {
      setTopResult(
        items.artists?.items.reduce((prev, current) => (prev.popularity > current.popularity ? prev : current)) ||
          items.artists?.items[0]
      );
    }
  }

  const [notFound, setNotFound] = useState<boolean>();
  const { query } = useParams();

  const topResultsHandler = async () => {
    if (props.token) {
      const response = await getSearchResults(props.token, ['track', 'artist'], query || '');
      getTopResult(response);
    }
  };

  const navigate = useNavigate();
  const link = topResult?.images[0] && topResult?.images[0].url;

  useEffect(() => {
    topResultsHandler();
    const flag =
      Object.entries(props.isAvailable).reduce((acc, curr) => (acc = acc + Number(curr[1])), 0) < 2 ? !0 : !1;
    setNotFound(flag);
  }, [props.isAvailable]);

  if (notFound)
    return (
      <div className={commonstyle.searchBody + ' ' + style.notFound}>
        <h2>{`No results found for "${query}"`}</h2>
        <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
      </div>
    );

  return (
    <div className={commonstyle.searchBody}>
      <div className={style.hat}>
        <section
          className={style.topResultContainer}
          hidden={!props.isAvailable['artists']}
          onClick={() => navigate(`/${topResult?.type}/${topResult?.id}`)}
        >
          <h2 className={style.header}>{t('topResult')}</h2>
          <div className={style.topResult}>
            <div
              className={style.topResult__image}
              style={{
                backgroundImage: `url(${link || ''})`,
              }}
            >
              {' '}
            </div>
            <div className={style.topResult__content}>
              <p>{topResult?.name}</p>
              <div>
                <span>{topResult?.type}</span>
              </div>
            </div>
          </div>
        </section>
        <section className={style.songsBlockContainer} hidden={!props.isAvailable['songs']}>
          <h2 className={style.header}>{t('upSongs')}</h2>
          <div className={style.songsBlock}>
            <div>
              {props.items?.tracks?.items.map((e, index) =>
                e.preview_url && index < 4 ? (
                  <TrackRow
                    album={false}
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
        </section>
      </div>
      {
        <RowOfCards title={'Albums'} hidden={!props.isAvailable['albums']}>
          {props.items?.albums?.items.map((e, i) => (i < 8 ? <CardItem key={e.id} album={e}></CardItem> : ''))}
        </RowOfCards>
      }
      {
        <RowOfCards title={'Artists'} hidden={!props.isAvailable['artists']}>
          {props.items?.artists?.items.map((e, i) => (i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : ''))}
        </RowOfCards>
      }
      {
        <RowOfCards title={'Playlists'} hidden={!props.isAvailable['playlists']}>
          {props.items?.playlists?.items.map((e, i) =>
            i < 8 ? (
              <CardItem
                key={e.id}
                album={e}
                onClick={() => {
                  navigate(`/playlist/${e.id}`);
                }}
              ></CardItem>
            ) : (
              ''
            )
          )}
        </RowOfCards>
      }
    </div>
  );
};
