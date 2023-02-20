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

  const [uniqueTracks, setUniqueTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [fourTracks, setFourTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const { query } = useParams();

  const uniqueTracksHandler = async () => {
    if (props.token) {
      const response = await getSearchResults(props.token, ['track', 'artist'], query || '');
      getTopResult(response);
      const tracks = response.tracks?.items;
      if (tracks) {
        const tracksWithoutDubl = tracks.reduce((accumulator: SpotifyApi.TrackObjectFull[], current) => {
          if (!accumulator.find(track => track.preview_url === current.preview_url)) {
            accumulator.push(current);
          }
          return accumulator;
        }, []);
        const fourTracks = tracksWithoutDubl.splice(0, 4);
        setUniqueTracks(tracksWithoutDubl);
        setFourTracks(fourTracks);
      }
    }
  };

  const navigate = useNavigate();
  const link = topResult?.images[0] && topResult?.images[0].url;

  useEffect(() => {
    uniqueTracksHandler();
  }, []);

  return (
    <div className={commonstyle.searchBody}>
      <div className={style.hat}>
        <section className={style.topResultContainer} onClick={() => navigate(`/${topResult?.type}/${topResult?.id}`)}>
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
        <section className={style.songsBlockContainer}>
          <h2 className={style.header}>{t('upSongs')}</h2>
          <div className={style.songsBlock}>
            <div>
              {fourTracks.map(e =>
                e.preview_url ? (
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
                    uniqueTracks={uniqueTracks}
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
        <RowOfCards title={'Albums'}>
          {props.items?.albums?.items.map((e, i) => (i < 8 ? <CardItem key={e.id} album={e}></CardItem> : ''))}
        </RowOfCards>
      }
      {
        <RowOfCards title={'Artists'}>
          {props.items?.artists?.items.map((e, i) => (i < 8 ? <CardArtist key={e.id} artist={e}></CardArtist> : ''))}
        </RowOfCards>
      }
      {
        <RowOfCards title={'Playlists'}>
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
