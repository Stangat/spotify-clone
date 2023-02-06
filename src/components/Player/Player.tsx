import { HeartOutlined, StepBackwardOutlined, PlayCircleOutlined, StepForwardOutlined } from '@ant-design/icons';
import ReactSlider from 'react-slider';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import LyricsIcon from '@mui/icons-material/Lyrics';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { VolumeUp, VolumeOff, OpenInFull, PlayCircleFilled } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { getCurrentlyPlayingTrack } from '../../../api/api';
import style from './player.module.less';
import './sliders.css';

type Props = {
  token: string;
};

const SongBlock = (props: Props) => {
  const [url, setUrl] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');

  useEffect(() => {
    const getCurrentlyPlayingTrackInfo = async () => {
      const track = await getCurrentlyPlayingTrack(props);
      const { url } = track.album.images[2];
      const artistName = track.artists[0].name;
      const songName = track.name;

      setUrl(url);
      setArtistName(artistName);
      setSongName(songName);
    };

    getCurrentlyPlayingTrackInfo();
  }, []);

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

const PlayerControls = () => {
  return (
    <div className={style.controlsContainer}>
      <div className={style.buttonsContainer}>
        <ShuffleIcon />
        <StepBackwardOutlined style={{ fontSize: '1.5rem' }} />
        <PlayCircleFilled style={{ fontSize: '2.5rem' }} />
        <StepForwardOutlined style={{ fontSize: '1.5rem' }} />
        <RepeatIcon />
      </div>
      <div className={style.sliderContainer}>
        <span className={style.start}>00:00</span>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
        <span className={style.duration}>00:00</span>
      </div>
    </div>
  );
};

const VolumeBlock = () => {
  return (
    <div className={style.volumeBlockContainer}>
      <LyricsIcon style={{ fontSize: '20px' }} />
      <QueueMusicIcon style={{ fontSize: '25px' }}/>
      <VolumeUp />
      <div className={style.volumeSliderContainer}>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
      </div>
      <OpenInFull style={{ fontSize: '20px' }} />
    </div>
  );
};

export const Player = (props: Props) => {
  return (
    <div className={style.playerContainer}>
      <SongBlock token={props.token} />
      <PlayerControls />
      <VolumeBlock />
    </div>
  );
};
