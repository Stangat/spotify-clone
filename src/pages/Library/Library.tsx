import { ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './library.module.less';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type LibraryPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const Library: React.FC<LibraryPageProps> = props => {
  const { t} = useTranslation();
  const TYPES = [
    { name: 'playlists', type: 'playlists', key: '1' },
    { name: 'artists', type: 'artists', key: '2' },
    { name: 'albums', type: 'albums', key: '2' },
  ];
  const navigate = useNavigate();
  const clickHandler = (e:any) => {
    switch (e.target.innerHTML) {
      case 'playlists':
        navigate(`/collection/playlists`);
        break;
      case 'artists':
        navigate(`/collection/artists`);
        break;
      case 'albums':
        navigate(`/collection/albums`);
        break;
      default:
        break;
    }
  };
  return (
    <div className={style.wrapper}>
      <DropdownProfile
        setToken={props.setToken}
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
      />
      <div className={style.tags}>
        {TYPES.map(e => {
          return (
            <span className={style.searchTag} key={e.name} onClick={clickHandler}>
              {t(e.name)}
            </span>
          );
        })}
      </div>
    </div>
  );
};
