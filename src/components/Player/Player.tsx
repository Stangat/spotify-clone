import style from './player.module.less';
import './sliders.css';
import { SongBlock } from './SongBlock';
import { PlayerControls } from './PlayerControls';
import { VolumeBlock } from './VolumeBlock';
import { AlbumType, ITrackTypes } from '../../../interface/interface';

type PlayerProps = {
  token: string;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  albums: AlbumType[];
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
};

export const Player: React.FC<PlayerProps> = ({
  token,
  isPlaying,
  setIsPlaying,
  player,
  songName,
  artistName,
  coverUrl,
  setCoverUrl,
  trackDuration,
  albumTracks,
  setAlbumTracks,
  setTrackId,
  setSongName,
  setArtistName,
}) => {
  return (
    <div className={style.playerContainer}>
      <SongBlock coverUrl={coverUrl} artistName={artistName} songName={songName} />
      <PlayerControls
        token={token}
        player={player}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        trackDuration={trackDuration}
        albumTracks={albumTracks}
        setAlbumTracks={setAlbumTracks}
        coverUrl={coverUrl}
        setCoverUrl={setCoverUrl}
        setTrackId={setTrackId}
        setSongName={setSongName}
        setArtistName={setArtistName}
      />
      <VolumeBlock player={player} />
    </div>
  );
};
