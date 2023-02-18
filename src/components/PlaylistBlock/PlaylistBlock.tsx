import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { PlaylistsType, UserCurrentPlaylist } from '../../../interface/interface';
import styles from '../DetailsProfilePage/detailsProfilePage.module.less';
import { useTranslation } from 'react-i18next';

type PlaylistBlockProps = {
  playlists: PlaylistsType | undefined;
};

export const PlaylistBlock: React.FC<PlaylistBlockProps> = props => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.topArtistUser}>
        <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription + ' ' + styles.desc}>
          {t('publicPlaylists')}
        </p>
        <div className={styles.playlistsUser}>
          {props.playlists?.items.map((playlist: UserCurrentPlaylist) => {
            return (
              <Card
                key={playlist.id}
                hoverable
                style={{
                  maxWidth: 205,
                  margin: '1%',
                  background: '#181818',
                  boxShadow: '0px 0px 5px 0px black',
                  border: 'none',
                  padding: '2%',
                }}
                cover={
                  <img
                    alt="example"
                    src="https://w7.pngwing.com/pngs/65/131/png-transparent-musical-note-eighth-notes-angle-monochrome-silhouette.png"
                    style={{ boxShadow: '0px 0px 5px 0px black' }}
                  />
                }
                onClick={() => {
                  navigate(`/playlist/${playlist.id}`);
                }}
              >
                <Meta title={playlist.name} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
