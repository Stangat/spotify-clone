import { ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CollectionAlbums } from './CollectionAlbums/CollectionAlbums';
import { CollectionPlaylists } from './CollectionPlaylists/CollectionPlaylists';
import { TopArtistBlock } from '../../components/TopArtistBlock/TopArtistBlock';
import style from './library.module.less';

type LibraryPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const Library: React.FC<LibraryPageProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const TYPES = [
    { name: 'playlists', type: 'playlists', key: '1' },
    { name: 'artists', type: 'artists', key: '2' },
    { name: 'albums', type: 'albums', key: '2' },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <DropdownProfile
          setToken={props.setToken}
          profile={props.profile}
          setProfile={props.setProfile}
          token={props.token}
        />
        <div className={style.tags}>
          {TYPES.map(e => {
            return (
              <span className={style.collectionTag} key={e.name} onClick={() => navigate(`/collection/${e.name}`)}>
                {t(e.name)}
              </span>
            );
          })}
        </div>
      </div>
      <Routes>
        <Route path="/playlists" element={<CollectionPlaylists token={props.token}/>} />
        <Route path="/artists" element={<TopArtistBlock token={props.token} />}/>
        <Route path="/albums" element={<CollectionAlbums token={props.token}/>}/>
    </Routes>
    </div>
  );
};
