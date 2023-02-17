import style from './player.module.less';
import { HeartOutlined } from '@ant-design/icons';
import { PictureInPictureAlt } from '@mui/icons-material';

type SongBlockProps = {
  artistName: string;
  songName: string;
  coverUrl: string;
};

export const SongBlock: React.FC<SongBlockProps> = ({ artistName, songName, coverUrl }) => {
  return (
    <div className={style.songBlockContainer}>
      <div className={style.coverContainer}>
        {coverUrl ? (
          <img width="64" height="64" alt="cover" src={coverUrl} />
        ) : (
          <img
            className={style.albumCover}
            width="64"
            height="64"
            alt="cover"
            src={'https://www.pngfind.com/pngs/m/461-4611544_vinyl-record-png-record-vinyl-transparent-png.png'}
          />
        )}
      </div>
      <div className={style.songNameAndArtistContainer}>
        <p className={style.songName}>{songName}</p>
        <p className={style.artistName}>{artistName}</p>
      </div>
      <div className={style.songInteractionContainer}>
        <HeartOutlined style={{ padding: '5px', fontSize: '16px' }} />
        <PictureInPictureAlt style={{ fontSize: '16px', marginLeft: '10px' }} />
      </div>
    </div>
  );
};
