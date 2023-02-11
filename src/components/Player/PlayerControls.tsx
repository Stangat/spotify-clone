import style from './player.module.less';
import { StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Progress } from 'antd';
import { Repeat, Shuffle } from '@mui/icons-material';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';

type PlayerControlsProps = {
  onClick: () => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  trackDuration: number;
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({ onClick, isPlaying, trackDuration, player }) => {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const updateTime = () => {
    let currentMinutes, currentSeconds, totalMinutes, totalSeconds;
    player.addEventListener('timeupdate', () => {
    currentMinutes = Math.floor(player.currentTime / 60);
    currentSeconds = Math.floor(player.currentTime % 60);
    totalMinutes = Math.floor(trackDuration / 60);
    totalSeconds = Math.floor(trackDuration % 60);

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (totalSeconds < 10) {
      totalSeconds = '0' + totalSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (totalMinutes < 10) {
      totalMinutes = '0' + totalMinutes;
    }
    setCurrentTime(`${currentMinutes}:${currentSeconds}`);
    setTotalTime(`${totalMinutes}:${totalSeconds}`);
    });
  };

  const updateProgress = () => {
    setProgress((player.currentTime / player.duration) * 100);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    }

    window.addEventListener('resize', handleWindowResize);
    player.addEventListener('timeupdate', updateProgress);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  updateTime();

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
      <div className={style.progressBarWrapper}>
        <span className={style.start}>{currentTime}</span>
        <div
          ref={ref}
          className={style.progressBarContainer}
          onClick={e => {
            const clickX = e.nativeEvent.offsetX;
            player.currentTime = (clickX / width) * trackDuration;
          }}
        >
          <Progress
            className={style.progressBar}
            percent={progress}
            showInfo={false}
            strokeColor="#1ad760"
            size="small"
            trailColor="gray"
          />
        </div>
        <span className={style.duration}>{totalTime}</span>
      </div>
    </div>
  );
};
