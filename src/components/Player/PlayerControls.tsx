import style from './player.module.less';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import ReactSlider from 'react-slider';
import { Repeat, Shuffle } from '@mui/icons-material';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

type PlayerControlsProps = {
  onClick: () => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  trackDuration: number;
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({ onClick, isPlaying, trackDuration }) => {
  return (
    <div className={style.controlsContainer}>
      <div className={style.buttonsContainer}>
        <Shuffle />
        <StepBackwardOutlined style={{ fontSize: '1.5rem' }} />
        {isPlaying ? (
          <PauseCircleFilled
            className={style.playPauseButton}
            onClick={() => {
              onClick();
            }}
          />
        ) : (
          <PlayCircleFilled
            className={style.playPauseButton}
            onClick={() => {
              onClick();
            }}
          />
        )}

        <StepForwardOutlined style={{ fontSize: '1.5rem' }} />
        <Repeat />
      </div>
      <div className={style.sliderContainer}>
        <span className={style.start}>00:00</span>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
        <span className={style.duration}>{isPlaying ? `00:${trackDuration}` : '00:00'}</span>
      </div>
    </div>
  );
};
