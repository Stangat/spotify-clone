import { Avatar, Card } from 'antd';
import { ArtistTopUserType, PlaylistsType, ProfileType, TopArtistsType, UserCurrentPlaylist } from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import { getUserPlaylists, getUserTopArtist } from '../../../api/api';
import { useEffect, useState } from 'react';
import { DropDownProfile } from '../DropDownProfile/DropDownProfile';
import Meta from 'antd/es/card/Meta';

type DetailsProfilePageProps = {
  token: string;
  profile: ProfileType | undefined;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  const [topArtists, setTopArtists] = useState<TopArtistsType>();

  const getPlaylistHandler = async () => {
    const response = await getUserPlaylists({ token: props.token });
    console.log(response)
    props.setPlaylists(response);
  };

  const getTopArtistsUserHandler = async () => {
    const response = await getUserTopArtist({ token: props.token });
    setTopArtists(response);
  };

  useEffect(() => {
    getTopArtistsUserHandler();
    getPlaylistHandler();
  }, []);

  return (
    <div className={styles.detailsProfileContainer}>
      <div className={styles.blockProfileDescription} key={props.profile?.id}>
        <div style={{ padding: '2%' }}>
          <Avatar size={250} icon={<UserOutlined />} />
        </div>
        <div className={styles.descriptionProfile}>
          <p>PROFILE</p>
          <p className={styles.userNameProfile}>{props.profile?.display_name}</p>
          <p>{props.playlists?.total} Public Playlists</p>
          <p>Followers: {props.profile?.followers.total}</p>
        </div>
      </div>
      <DropDownProfile />
      <div className={styles.topArtistUser}>
        <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription}>Top artists this month</p>
        <p className={styles.descriptionTopArtist}>Only visible to you</p>
        <div>
          {topArtists?.items.map((artist: ArtistTopUserType) => {
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
              >
                <Meta title={artist.name} description={artist.type} />
              </Card>
            );
          })}
        </div>
      </div>
      {/* tracks favourite */}
      <div className={styles.topArtistUser}>
        <p className={styles.descriptionTopArtist + ' ' + styles.topArtisDescription + ' ' + styles.desc}>Public Playlist</p>
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
                cover={<img alt="example" /* src */ style={{ boxShadow: '0px 0px 5px 0px black' }} />}
              >
                <Meta title={playlist.name}/>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
