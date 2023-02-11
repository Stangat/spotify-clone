import style from './player.module.less';
import './sliders.css';
import { SongBlock } from './SongBlock';
import { PlayerControls } from './PlayerControls';
import { VolumeBlock } from './VolumeBlock';

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
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
};

export const Player: React.FC<PlayerProps> = ({ isPlaying, setIsPlaying, player, songName, artistName, coverUrl, trackDuration }) => {
  const playHandler = () => {
    if (!isPlaying && coverUrl !== '') {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={style.playerContainer}>
      <SongBlock coverUrl={coverUrl} artistName={artistName} songName={songName} />
      <PlayerControls
        player={player}
        onClick={() => {
          playHandler();
        }}
        isPlaying={isPlaying}
        trackDuration={trackDuration}
      />
      <VolumeBlock />
    </div>
  );
};
