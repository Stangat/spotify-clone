import { margin } from '@mui/system';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { ArtistTopUserType, TopArtistsType } from '../../../interface/interface';
import styles from '../DetailsProfilePage/detailsProfilePage.module.less';
import { useTranslation } from 'react-i18next';

type TopArtistBlockProps = {
  topArtists: TopArtistsType | undefined;
};

export const TopArtistBlock: React.FC<TopArtistBlockProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={styles.topArtistUser}>
      <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription}>Top artists this month</p>
      <p className={styles.descriptionTopArtist}>{t('visible')}</p>
      <div className={styles.cardsTopBlock}>
        {props.topArtists?.items.map((artist: ArtistTopUserType) => {
          return (
            <Card
              key={artist.id}
              hoverable
              style={{
                flex: '1',
                margin: '1%',
                background: '#181818',
                boxShadow: '0px 0px 5px 0px black',
                border: 'none',
                padding: '2%',
              }}
              cover={
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    backgroundImage: `url(${artist.images[1].url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    margin: 'auto',
                    boxShadow: '0px 0px 5px 0px black',
                    borderRadius: '50%',
                  }}
                ></div>
              }
              onClick={() => {
                navigate(`/artist/${artist.id}`);
              }}
            >
              <Meta
                title={
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '700',
                    }}
                  >
                    {artist.name.length < 25 ? artist.name : `${artist.name.slice(0, 25)}...`}
                  </p>
                }
                description={artist.type}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};
