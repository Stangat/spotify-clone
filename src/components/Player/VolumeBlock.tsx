import style from './player.module.less';
import Slider from '@mui/material/Slider';
import { VolumeUp, VolumeDown, VolumeOff, VolumeMute, OpenInFull, QueueMusic, Lyrics } from '@mui/icons-material';
import { useState } from 'react';

type VolumeBlockProps = {
  player: HTMLAudioElement;
};

export const VolumeBlock: React.FC<VolumeBlockProps> = ({ player }) => {
  const [playerMuted, setPlayerMuted] = useState(false);
  const [value, setValue] = useState<number | number[]>(100);
  const [playerVolume, setPlayerVolume] = useState(0.3);

  const handleVolume = (event: Event, newValue: number | number[]) => {
    const maxValue = 100;
    setValue(newValue);
    if (typeof value === 'number') {
      const volume = value / maxValue;
      player.volume = volume;
      if (newValue < 5) {
        setPlayerMuted(true);
        player.muted = true;
      } else {
        setPlayerMuted(false);
        player.muted = false;
      }
    }
  };

  const handleMuteAudio = () => {
    const maxValue = 100;
    if (player.muted === true) {
      setPlayerMuted(false);
      player.muted = false;
      setValue(playerVolume * maxValue);
    } else {
      setPlayerMuted(true);
      setPlayerVolume(player.volume);
      player.muted = true;
      setValue(0);
    }
  };

  return (
    <div className={style.volumeBlockContainer}>
      <Lyrics style={{ fontSize: '20px' }} />
      <div onClick={handleMuteAudio}>
        {playerMuted ? (
          <VolumeOff
            sx={{
              fontSize: '20px',
              opacity: '0.7',
              transition: '0.2s',
              '&:hover': {
                opacity: '1',
                cursor: 'pointer',
              },
              '&:active': {
                opacity: '0.7',
              },
            }}
          />
        ) : (
          <VolumeUp
            sx={{
              fontSize: '20px',
              opacity: '0.7',
              transition: '0.2s',
              '&:hover': {
                opacity: '1',
                cursor: 'pointer',
              },
              '&:active': {
                opacity: '0.7',
              },
            }}
          />
        )}
      </div>

      <div className={style.volumeSliderContainer}>
        <Slider
          aria-label="Volume"
          value={value}
          onChange={handleVolume}
          size="small"
          sx={{
            color: '#1ad760',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-rail': {
              color: '#ffffff',
            },
            '& .MuiSlider-thumb': {
              backgroundColor: '#fff',
              '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
      </div>
    </div>
  );
};
