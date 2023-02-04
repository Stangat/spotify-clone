import { HeartOutlined } from '@ant-design/icons';
import { PicRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getCurrentlyPlayingTrack } from '../../../api/api';
import style from './player.module.less';

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
        <HeartOutlined style={{padding: '5px', fontSize: '18px'}} />
        <PicRightOutlined style={{padding: '5px', fontSize: '18px'}} />
      </div>
    </div>
  );
};

export const Player = (props: Props) => {
  return (
    <div className={style.playerContainer}>
      <SongBlock token={props.token} />
    </div>
  );
};
