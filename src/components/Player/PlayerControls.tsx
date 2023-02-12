import style from './player.module.less';
import { StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Progress } from 'antd';
import { Repeat, Shuffle } from '@mui/icons-material';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { AlbumType, ITrackTypes } from '../../../interface/interface';
import { getTrack } from '../../../api/api';

type PlayerControlsProps = {
  token: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  player: HTMLAudioElement;
  trackDuration: number;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
  setTrackId: (trackId: string) => void;
  setSongName: (songName: string) => void;
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  token,
  isPlaying,
  trackDuration,
  player,
  albumTracks,
  setIsPlaying,
  coverUrl,
  setCoverUrl,
  setTrackId,
  setSongName,
}) => {
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

  const playHandler = () => {
    if (!isPlaying && coverUrl !== '') {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  const skipToNext = async () => {
    if (player.src !== '') {
      const currentTrackIndex = albumTracks.findIndex(track => track.preview_url === player.src);
      if (currentTrackIndex < albumTracks.length - 1) {
        const nextTrackIndex = currentTrackIndex + 1;
        const nextTrackUrl = albumTracks[nextTrackIndex].preview_url;
        const nextTrackId = albumTracks[nextTrackIndex].id;
        const nextTrackSongName = albumTracks[nextTrackIndex].name;
        setSongName(nextTrackSongName);
        const currentTrack = await getTrack(token, nextTrackId);
        const url = await currentTrack.album.images[0].url;
        setTrackId(nextTrackId);
        setCoverUrl(url);
        player.src = nextTrackUrl;
        if (!isPlaying) {
          setIsPlaying(true);
        }
        player.play();
      }
    }
  };

  const skipToPrevious = async () => {
    if (player.src !== '') {
      const currentTrackIndex = albumTracks.findIndex(track => track.preview_url === player.src);
      if (currentTrackIndex > 0) {
        const previousTrackIndex = currentTrackIndex - 1;
        const previousTrackUrl = albumTracks[previousTrackIndex].preview_url;
        const previousTrackId = albumTracks[previousTrackIndex].id;
        const previousTrackSongName = albumTracks[previousTrackIndex].name;
        setSongName(previousTrackSongName);
        const currentTrack = await getTrack(token, previousTrackId);
        const url = await currentTrack.album.images[0].url;
        setTrackId(previousTrackId);
        setCoverUrl(url);
        player.src = previousTrackUrl;
        if (!isPlaying) {
          setIsPlaying(true);
        }
        player.play();
      }
    }
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
        <StepBackwardOutlined
          className={style.nextPrevButton}
          // style={{ fontSize: '1.5rem' }}
          onClick={() => {
            skipToPrevious();
          }}
        />
        {isPlaying ? (
          <PauseCircleFilled
            className={style.playPauseButton}
            onClick={() => {
              playHandler();
            }}
          />
        ) : (
          <PlayCircleFilled
            className={style.playPauseButton}
            onClick={() => {
              playHandler();
            }}
          />
        )}
        <StepForwardOutlined
          className={style.nextPrevButton}
          // style={{ fontSize: '1.5rem' }}
          onClick={() => {
            skipToNext();
          }}
        />
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
