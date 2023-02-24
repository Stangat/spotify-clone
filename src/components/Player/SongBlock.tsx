import style from './player.module.less';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { PictureInPictureAlt } from '@mui/icons-material';
import {
  removeUserSavedTracksSpotifyApi,
  saveTrackForCurrentUserSpotifyApi,
} from '../../../api/api';

type SongBlockProps = {
  token: string;
  artistName: string;
  songName: string;
  coverUrl: string;
  trackId: string;
  likedSong?: boolean;
  setLikedSong: (likedSong: boolean) => void;
};

export const SongBlock: React.FC<SongBlockProps> = ({
  token,
  artistName,
  songName,
  coverUrl,
  trackId,
  likedSong,
  setLikedSong,
}) => {
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
        {likedSong ? (
          <HeartFilled
            className={style.likeSongButtonActive}
            onClick={async () => {
              await removeUserSavedTracksSpotifyApi(token, trackId);
              setLikedSong(false);
            }}
          />
        ) : (
          <HeartOutlined
            className={style.likeSongButton}
            onClick={async () => {
              setLikedSong(true);
              await saveTrackForCurrentUserSpotifyApi(token, trackId, { id: [trackId] });
            }}
          />
        )}
        <PictureInPictureAlt style={{ fontSize: '16px', marginLeft: '10px' }} />
      </div>
    </div>
  );
};
