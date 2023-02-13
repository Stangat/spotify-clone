import { Layout } from 'antd';
import { AlbumType, ITrackTypes, PlaylistsType, ProfileType } from '../../../interface/interface';
import { DetailsProfilePage } from '../../components/DetailsProfilePage/DetailsProfilePage';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import { SideBar } from '../../components/SideBar/SideBar';

type ProfilePageProps = {
  token: string;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = props => {
  return (
    <div style={{ background: '#1e1e1e' }}>
      <Layout hasSider style={{ background: 'rgb(30, 30, 30)', marginBottom: '10%' }}>
        <SideBar />
        <Layout style={{ background: '#1e1e1e', display: 'flex' }}>
          <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} />
          <DetailsProfilePage
            profile={props.profile}
            playlists={props.playlists}
            setPlaylists={props.setPlaylists}
            token={props.token}
          />
        </Layout>
      </Layout>
    </div>
  );
};
