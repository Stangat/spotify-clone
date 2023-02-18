import { ProfileType, UserAlbumsType } from '../../../interface/interface';
import style from './collectionAlbums.module.less';
import { Library } from '../../pages/Library/Library';
import { CardItem } from '../CardItem/CardItem';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type CollectionAlbumsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  userAlbums: UserAlbumsType | undefined;
};

export const CollectionAlbums: React.FC<CollectionAlbumsProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={style.wrapper}>
      <Library setToken={props.setToken} profile={props.profile} setProfile={props.setProfile} token={props.token} />
      <div className={style.mainBlock}>
        <span className={style.title}>{t('albums')}</span>
        {props.userAlbums &&
          props.userAlbums.items.map(e => {
            return (
              <CardItem
                key={e.album.id}
                album={e.album}
                onClick={() => {
                  navigate(`/album/${e.album.id}`);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};
