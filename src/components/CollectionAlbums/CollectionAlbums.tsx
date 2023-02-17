import {ProfileType} from '../../../interface/interface';
import style from './collectionAlbums.module.less';
import { Library } from '../../pages/Library/Library';

type CollectionAlbumsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const CollectionAlbums: React.FC<CollectionAlbumsProps> = props => {
  return (
    <div className={style.wrapper}>
      <Library setToken={props.setToken} profile={props.profile} setProfile={props.setProfile} token={props.token} />
    </div>
  );
};
