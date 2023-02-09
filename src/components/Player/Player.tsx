import { HeartOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import ReactSlider from 'react-slider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import LyricsIcon from '@mui/icons-material/Lyrics';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { VolumeUp, VolumeOff, OpenInFull, PlayCircleFilled, PauseCircleFilled } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  getAvailableDevices,
  getCurrentlyPlayingTrack,
  getPlaybackState,
  getTrack,
  pausePlayback,
  startPlayback,
} from '../../../api/api';
import style from './player.module.less';
import './sliders.css';
import { Slider } from 'antd';

type Token = {
  token: string;
};

type SongBlockProps = {
  url: string;
  artistName: string;
  songName: string;
};

type PlayerControlsProps = {
  // onClick: () => Promise<void>;
  onClick: () => void;
  isPlaying: boolean;
  duration: string;
};

const SongBlock: React.FC<SongBlockProps> = ({ url, artistName, songName }) => {
  return (
    <div className={style.songBlockContainer}>
      <div className={style.coverContainer}>
        <img
          className={style.albumCover}
          width="64"
          height="64"
          alt="cover"
          src={
            url ? url : 'https://www.pngfind.com/pngs/m/461-4611544_vinyl-record-png-record-vinyl-transparent-png.png'
          }
        />
      </div>
      <div className={style.songNameAndArtistContainer}>
        <p className={style.songName}>{songName}</p>
        <p className={style.artistName}>{artistName}</p>
      </div>
      <div className={style.songInteractionContainer}>
        <HeartOutlined style={{ padding: '5px', fontSize: '18px' }} />
        <PictureInPictureAltIcon style={{ fontSize: '20px', marginLeft: '10px' }} />
      </div>
    </div>
  );
};

const PlayerControls: React.FC<PlayerControlsProps> = ({ onClick, isPlaying, duration }) => {
  return (
    <div className={style.controlsContainer}>
      <div className={style.buttonsContainer}>
        <ShuffleIcon />
        <StepBackwardOutlined style={{ fontSize: '1.5rem' }} />
        {isPlaying ? (
          <PauseCircleFilled style={{ fontSize: '2.5rem' }} />
        ) : (
          <PlayCircleFilled
            style={{ fontSize: '2.5rem' }}
            onClick={() => {
              onClick();
            }}
          />
        )}

        <StepForwardOutlined style={{ fontSize: '1.5rem' }} />
        <RepeatIcon />
      </div>
      <div className={style.sliderContainer}>
        <span className={style.start}>00:00</span>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
        <span className={style.duration}>{duration}</span>
      </div>
    </div>
  );
};

const VolumeBlock = () => {
  return (
    <div className={style.volumeBlockContainer}>
      <LyricsIcon style={{ fontSize: '20px' }} />
      <QueueMusicIcon style={{ fontSize: '25px' }} />
      <VolumeUp />
      <div className={style.volumeSliderContainer}>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
      </div>
      <OpenInFull style={{ fontSize: '20px' }} />
    </div>
  );
};

export const Player: React.FC<Token> = ({ token }) => {
  const [url, setUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [id, setDeviceId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState('');

  // const playHandler = async () => {
  // if (id) {
  //   if (!isPlaying) {
  //     await startPlayback({ token }, id);
  //     setIsPlaying(true);
  //   } else {
  //     await pausePlayback({ token }, id);
  //     setIsPlaying(false);
  //   }
  // }
  // await getCurrentlyPlayingTrackInfo();
  // };

  function play() {
    const player = new Audio();
    player.src =
      'https://p.scdn.co/mp3-preview/bb33431965d270fbf0440480e64633e2dc0fad60?cid=774b29d4f13844c495f206cafdad9c86';
    player.play();
  }

  const getCurrentlyPlayingTrackInfo = async () => {
    // try {
    const MILLISECOND_TO_SECOND = 0.001;
    const SECONDS_IN_MINUTE = 60;

    const track = await getCurrentlyPlayingTrack({ token });
    const { url } = track.album.images[2];
    const artistName = track.artists[0].name;
    const songName = track.name;
    const minutes = Math.trunc((+track.duration_ms * MILLISECOND_TO_SECOND) / SECONDS_IN_MINUTE);
    const seconds = Math.trunc(
      (((track.duration_ms * MILLISECOND_TO_SECOND) / SECONDS_IN_MINUTE) % 1) * SECONDS_IN_MINUTE
    );
    const duration = `${minutes}:${seconds}`;
    setTrackDuration(duration);
    setUrl(url);
    setArtistName(artistName);
    setSongName(songName);
    // } catch {
    //   console.error('Please, go to https://open.spotify.com/ and press play');
    // }
  };

  const playbackStateHandler = async () => {
    try {
      const track = await getPlaybackState({ token });
      const result = track.is_playing;
      setIsPlaying(result);
    } catch {}
  };

  useEffect(() => {
    // getDeviceId();
    getTrack({ token });
    // getCurrentlyPlayingTrackInfo();
    // playbackStateHandler();
  }, []);

  // return <SpotifyPlayer token={token} uris={'spotify:track:11dFghVXANMlKmJXsNCbNl'} />;
  return (
    <div className={style.playerContainer}>
      <SongBlock url={url} artistName={artistName} songName={songName} />
      <PlayerControls
        onClick={() => {
          play();
        }}
        isPlaying={isPlaying}
        duration={trackDuration}
      />
      <VolumeBlock />
    </div>
  );
};
