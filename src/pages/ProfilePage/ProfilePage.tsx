import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { ProfileType } from '../../../interface/interface';
import { DetailsProfilePage } from '../../components/DetailsProfilePage/DetailsProfilePage';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import { Player } from '../../components/Player/Player';
import { SideBar } from '../../components/SideBar/SideBar';

const footerStyle: React.CSSProperties = {
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0',
  padding: '15px',
  color: '#fff',
  backgroundColor: '#1c1b1b',
  borderTop: '1px solid #302f2f',
};

type ProfilePageProps = {
  token: string;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (ArtistName: string) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  return (
    <div>
      <Layout hasSider>
        <Layout>
          <SideBar />
          <Layout style={{ background: 'rgb(30, 30, 30)', height: '100vh', display: 'flex' }}>
            <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} />
            <DetailsProfilePage profile={props.profile} />
          </Layout>
        </Layout>
        <Footer style={footerStyle}>
          <Player
            token={props.token}
            setIsPlaying={props.setIsPlaying}
            isPlaying={props.isPlaying}
            player={props.player}
            songName={props.songName}
            artistName={props.artistName}
            setSongName={props.setSongName}
            setArtistName={props.setArtistName}
            coverUrl={props.coverUrl}
            trackDuration={props.trackDuration}
            setTrackDuration={props.setTrackDuration}
          />
        </Footer>
      </Layout>
    </div>
  );
};
