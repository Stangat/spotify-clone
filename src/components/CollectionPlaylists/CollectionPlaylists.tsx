import { PlaylistsType, ProfileType } from '../../../interface/interface';
import style from './collectionPlaylists.module.less';

type CollectionPlaylistsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  playlists: PlaylistsType | undefined;
};

import { useNavigate } from 'react-router-dom';
import { Library } from '../../pages/Library/Library';
import { PlaylistBlock } from '../PlaylistBlock/PlaylistBlock';

export const CollectionPlaylists: React.FC<CollectionPlaylistsProps> = props => {
  const navigate = useNavigate();
  return (
    <div className={style.wrapper}>
      <Library setToken={props.setToken} profile={props.profile} setProfile={props.setProfile} token={props.token} />
      <div className={style.mainBlock}>
        <span className={style.title}>Playlists</span>
        <div className={style.blockView}>
          <div className={style.blockPlaylists} onClick={()=>navigate('tracks')}>
            <span className={style.titleBlock}>Liked Songs</span>
          </div>
          <PlaylistBlock playlists={props.playlists} />
        </div>
      </div>
    </div>
  );
};
