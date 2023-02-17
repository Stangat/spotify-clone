import { PlaylistsType, ProfileType, TopArtistsType } from '../../../interface/interface';
import style from './collectionArtists.module.less';
import { useNavigate } from 'react-router-dom';
import { Library } from '../../pages/Library/Library';
import { TopArtistBlock } from '../TopArtistBlock/TopArtistBlock';

type CollectionArtistsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  topArtists: TopArtistsType | undefined;
};

export const CollectionArtists: React.FC<CollectionArtistsProps> = props => {
  return (
    <div className={style.wrapper}>
      <Library setToken={props.setToken} profile={props.profile} setProfile={props.setProfile} token={props.token} />
      <TopArtistBlock topArtists={props.topArtists} />
    </div>
  );
};
