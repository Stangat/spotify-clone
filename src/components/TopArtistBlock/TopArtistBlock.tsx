import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { ArtistTopUserType, TopArtistsType } from '../../../interface/interface';
import styles from '../DetailsProfilePage/detailsProfilePage.module.less';

type TopArtistBlockProps = {
  topArtists: TopArtistsType | undefined;
};


export const TopArtistBlock: React.FC<TopArtistBlockProps> = props => {
    const navigate = useNavigate();
  return (
    <div className={styles.topArtistUser}>
      <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription}>Top artists this month</p>
      <p className={styles.descriptionTopArtist}>Only visible to you</p>
      <div className={styles.cardsTopBlock}>
        {props.topArtists?.items.map((artist: ArtistTopUserType) => {
          return (
            <Card
              key={artist.id}
              hoverable
              style={{
                maxWidth: 205,
                margin: '1%',
                background: '#181818',
                boxShadow: '0px 0px 5px 0px black',
                border: 'none',
                padding: '2%',
              }}
              cover={<img alt="example" src={artist.images[2].url} style={{ boxShadow: '0px 0px 5px 0px black' }} />}
              onClick={() => {
                navigate(`/artist/${artist.id}`);
              }}
            >
              <Meta title={artist.name} description={artist.type} />
            </Card>
          );
        })}
      </div>
      
    </div>
  );
};
