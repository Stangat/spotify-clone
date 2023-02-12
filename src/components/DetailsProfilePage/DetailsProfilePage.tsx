import { Avatar } from 'antd';
import { PlaylistsType, ProfileType } from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';
import { getUserPlaylists } from '../../../api/api';
import { useEffect } from 'react';
import { DropDownProfile } from '../DropDownProfile/DropDownProfile';

type DetailsProfilePageProps = {
  token: string;
  profile: ProfileType | undefined;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  const getPlaylistHandler = async () => {
    const response = await getUserPlaylists({ token: props.token });
    console.log(response);
    props.setPlaylists(response);
  };

  useEffect(() => {
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
    </div>
  );
};
