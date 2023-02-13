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
  setArtistName: (ArtistName: string) => void;
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
  setArtistName,
}) => {
  const [currentTime, setCurrentTime] = useState('00:00');
  // const [totalTime, setTotalTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  const updateTime = () => {
    let currentMinutes, currentSeconds;
    player.addEventListener('timeupdate', () => {
      currentMinutes = Math.floor(player.currentTime / 60);
      currentSeconds = Math.floor(player.currentTime % 60);

      if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds;
      }

      if (currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes;
      }

      setCurrentTime(`${currentMinutes}:${currentSeconds}`);
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
        const nextTrackArtistName = albumTracks[nextTrackIndex].artists[0].name;
        setSongName(nextTrackSongName);
        setArtistName(nextTrackArtistName);
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
        const previousTrackArtistName = albumTracks[previousTrackIndex].artists[0].name;
        setArtistName(previousTrackArtistName);
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

  const handlePlayingEnding = async () => {
    setIsPlaying(false);
    const currAlbumTracks = localStorage.getItem('albumTracks');
    if (currAlbumTracks) {
      const currAlbumTracksParsed: ITrackTypes[] = JSON.parse(currAlbumTracks);
      const currentTrackIndex = currAlbumTracksParsed.findIndex(track => track.preview_url === player.src);
      if (currentTrackIndex < currAlbumTracksParsed.length - 1) {
        const nextTrackIndex = currentTrackIndex + 1;
        const nextTrackUrl = currAlbumTracksParsed[nextTrackIndex].preview_url;
        const nextTrackId = currAlbumTracksParsed[nextTrackIndex].id;
        const nextTrackSongName = currAlbumTracksParsed[nextTrackIndex].name;
        const nextTrackArtistName = currAlbumTracksParsed[nextTrackIndex].artists[0].name;
        setSongName(nextTrackSongName);
        setArtistName(nextTrackArtistName);
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
    player.addEventListener('ended', handlePlayingEnding);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      player.removeEventListener('ended', handlePlayingEnding);
    };
  }, []);

  updateTime();

  return (
    <div className={style.controlsContainer}>
      <div className={style.buttonsContainer}>
        <Shuffle />
        <StepBackwardOutlined
          className={style.nextPrevButton}
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
        <span className={style.duration}>{player.src === '' ? '00:00' : '00:30'}</span>
      </div>
    </div>
  );
};
