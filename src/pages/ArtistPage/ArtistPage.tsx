import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtist, getArtistAlbum} from '../../../api/api';
import { ArtistAlbums, ArtistType, ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './artistPage.module.less';
import { useTranslation } from 'react-i18next';
import { CardItem } from '../../components/CardItem/CardItem';

type ArtistPageProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const ArtistPage: React.FC<ArtistPageProps> = props => {
  const { t } = useTranslation();
  const [artist, setArtist] = useState<ArtistType>();
  const [artistAlbum, setArtistAlbum] = useState<ArtistAlbums>();
  const { id } = useParams();

  const getArtistHandler = async () => {
    const response = await getArtist({ id: id || '', token: props.token });
    setArtist(response);
  };

  const getArtistAlbumsHandler = async () => {
    const response = await getArtistAlbum({ id: id  || '', token: props.token });
    setArtistAlbum(response);
  };


  useEffect(() => {
    getArtistHandler();
    getArtistAlbumsHandler();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <DropdownProfile
          setToken={props.setToken}
          profile={props.profile}
          setProfile={props.setProfile}
          token={props.token}
        />
      </div>
      <div className={style.forBg}>
        <div className={style.blockTop}>
          <div className={style.artistImg}>
            <img src={artist?.images ? artist?.images[0].url : ''} alt='img'></img>
          </div>
          <div className={style.artistTextContentBlock}>
            <h1 className={style.artistName}>{artist?.name}</h1>
            <p className={style.artistFollowers}>{t('followers')}: {artist?.followers.total}</p>
          </div>
        </div>
      </div>
      <div className={style.artistAlbum}>
        <h2 className={style.title}>{t('several')}</h2>
        <div className={style.cardAlbum}>
          {artistAlbum?.items.map(e => <CardItem album={e}></CardItem>)}
        </div>
      </div>
    </div>
  );
};
