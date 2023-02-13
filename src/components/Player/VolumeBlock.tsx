import style from './player.module.less';
import ReactSlider from 'react-slider';
import { VolumeUp, VolumeOff, OpenInFull, QueueMusic, Lyrics } from '@mui/icons-material';

export const VolumeBlock = () => {
  return (
    <div className={style.volumeBlockContainer}>
      <Lyrics style={{ fontSize: '20px' }} />
      <QueueMusic style={{ fontSize: '25px' }} />
      <VolumeUp />
      <div className={style.volumeSliderContainer}>
        <ReactSlider className="slider" trackClassName="slider-track" thumbClassName="slider-thumb" />
      </div>
      <OpenInFull style={{ fontSize: '20px' }} />
    </div>
  );
};
