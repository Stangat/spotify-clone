import { FC, useEffect, useState } from 'react';
import { ITrackTypes } from '../../../interface/interface';
import { TrackRow } from '../../components/Track/TrackRow';
import { FIELDS } from '../PlaylistPage/PlaylistPage';
import style from './searchSongs.module.less';

type SearchSongsProps = {
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

export const SearchSongs: FC<SearchSongsProps> = props => {
  const [uniqueTracks, setUniqueTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const uniqueTracksHandler = () => {
    const tracks = props.items?.tracks?.items;
    if (tracks) {
      const tracksWithoutDubl = tracks.reduce((accumulator: SpotifyApi.TrackObjectFull[], current) => {
        if (!accumulator.find(track => track.preview_url === current.preview_url)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      setUniqueTracks(tracksWithoutDubl);
    }
  };

  useEffect(() => {
    uniqueTracksHandler();
  }, []);

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
        {uniqueTracks.map(e =>
          e.preview_url ? (
            <TrackRow
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
  );
};
