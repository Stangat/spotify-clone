import style from './player.module.less';
import { StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Progress } from 'antd';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { ITrackTypes } from '../../../interface/interface';
import { getTrack } from '../../../api/api';
import { RepeatComponent } from './Repeat';
import { ShuffleComponent } from './Shuffle';

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
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
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
  shuffle,
  setShuffle,
}) => {
  const [currentTime, setCurrentTime] = useState('00:00');
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

  const handleTrackDataAndPlayer = async (index: number) => {
    const currAlbumTracks = localStorage.getItem('albumTracks');
    if (currAlbumTracks) {
      const currAlbumTracksParsed: ITrackTypes[] = JSON.parse(currAlbumTracks);
      const trackUrl = currAlbumTracksParsed[index].preview_url;
      const trackId = currAlbumTracksParsed[index].id;
      const trackSongName = currAlbumTracksParsed[index].name;
      const trackArtistName = currAlbumTracksParsed[index].artists[0].name;
      setSongName(trackSongName);
      setArtistName(trackArtistName);
      const currentTrack = await getTrack(token, trackId);
      const url = await currentTrack.album.images[0].url;
      setTrackId(trackId);
      setCoverUrl(url);
      player.src = trackUrl;
      if (!isPlaying) {
        setIsPlaying(true);
      }
      player.play();
    }
  };

  const shuffleAlbumTracks = (albumTracks: ITrackTypes[]) => {
    return albumTracks.sort(() => {
      return Math.random() - 0.5;
    });
  };

  const swapTracks = (albumTracks: ITrackTypes[]) => {
    const currentTrack = albumTracks.find(track => track.preview_url === player.src);
    const currentTrackIndex = albumTracks.findIndex(track => track.preview_url === player.src);
    const firstTrack = albumTracks[0];
    if (currentTrack !== firstTrack) {
      const buf = firstTrack;
      albumTracks[0] = albumTracks[currentTrackIndex];
      albumTracks[currentTrackIndex] = buf;
    }
  };

  const skipToNext = async () => {
    if (player.src !== '') {
      const shuffled = localStorage.getItem('shuffled');
      const currAlbumTracks = localStorage.getItem('albumTracks');
      if (currAlbumTracks) {
        const currAlbumTracksParsed: ITrackTypes[] = JSON.parse(currAlbumTracks);
        if (shuffled === 'false') {
          shuffleAlbumTracks(currAlbumTracksParsed);
          swapTracks(currAlbumTracksParsed);
          localStorage.setItem('albumTracks', JSON.stringify(currAlbumTracksParsed));
          localStorage.setItem('shuffled', 'true');
          handleTrackDataAndPlayer(1);
        } else {
          const currentTrackIndex = currAlbumTracksParsed.findIndex(track => track.preview_url === player.src);
          if (currentTrackIndex < currAlbumTracksParsed.length - 1) {
            const nextTrackIndex = currentTrackIndex + 1;
            handleTrackDataAndPlayer(nextTrackIndex);
          }
        }
      }
    }
  };

  const skipToPrevious = async () => {
    if (player.src !== '') {
      const shuffled = localStorage.getItem('shuffled');
      const currAlbumTracks = localStorage.getItem('albumTracks');
      if (currAlbumTracks) {
        const currAlbumTracksParsed: ITrackTypes[] = JSON.parse(currAlbumTracks);
        if (shuffled === 'false') {
          shuffleAlbumTracks(currAlbumTracksParsed);
          swapTracks(currAlbumTracksParsed);
          localStorage.setItem('albumTracks', JSON.stringify(currAlbumTracksParsed));
          localStorage.setItem('shuffled', 'true');
        } else {
          const currentTrackIndex = currAlbumTracksParsed.findIndex(track => track.preview_url === player.src);
          if (currentTrackIndex > 0) {
            const nextTrackIndex = currentTrackIndex - 1;
            handleTrackDataAndPlayer(nextTrackIndex);
          }
        }
      }
    }
  };

  const handlePlayingEnding = async () => {
    const repeat = localStorage.getItem('repeat');
    const shuffled = localStorage.getItem('shuffled');
    const currAlbumTracks = localStorage.getItem('albumTracks');
    if (currAlbumTracks) {
      const currAlbumTracksParsed: ITrackTypes[] = JSON.parse(currAlbumTracks);
      if (shuffled === 'false') {
        shuffleAlbumTracks(currAlbumTracksParsed);
        handleTrackDataAndPlayer(0);
      } else {
        const currentTrackIndex = currAlbumTracksParsed.findIndex(track => track.preview_url === player.src);
        if (currentTrackIndex < currAlbumTracksParsed.length - 1) {
          if (repeat === 'one') {
            handleTrackDataAndPlayer(currentTrackIndex);
          } else {
            const nextTrackIndex = currentTrackIndex + 1;
            handleTrackDataAndPlayer(nextTrackIndex);
          }
        } else {
          if (repeat === 'all') {
            handleTrackDataAndPlayer(0);
          }
          if (repeat === 'one') {
            handleTrackDataAndPlayer(currAlbumTracksParsed.length - 1);
          } else {
            setIsPlaying(false);
          }
        }
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
        <ShuffleComponent albumTracks={albumTracks} shuffle={shuffle} setShuffle={setShuffle} />
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
        <RepeatComponent />
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
