import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { AlbumType, ITrackTypes, PlaylistsType, ProfileType } from '../../../interface/interface';
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
  setToken: (token:string)=>void
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
  playlists: PlaylistsType | undefined;
  setPlaylists: (playlist: PlaylistsType) => void;
  albums: AlbumType[];
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
};

export const ProfilePage: React.FC<ProfilePageProps> = props => {
  return (
    <div style={{ background: '#1e1e1e' }}>
      <Layout hasSider style={{ background: 'rgb(30, 30, 30)', marginBottom: '10%' }}>
        <Layout style={{ background: '#1e1e1e' }}>
          <SideBar />
          <Layout style={{ background: '#1e1e1e', display: 'flex' }}>
            <DropdownProfile setToken={props.setToken}profile={props.profile} setProfile={props.setProfile} token={props.token} />
            <DetailsProfilePage
              profile={props.profile}
              playlists={props.playlists}
              setPlaylists={props.setPlaylists}
              token={props.token}
              setIsPlaying={props.setIsPlaying}
              isPlaying={props.isPlaying}
              player={props.player}
              setSongName={props.setSongName}
              setArtistName={props.setArtistName}
              setCoverUrl={props.setCoverUrl}
              trackDuration={props.trackDuration}
              setTrackDuration={props.setTrackDuration}
              trackId={props.trackId}
              setTrackId={props.setTrackId}
              albumTracks={props.albumTracks}
              setAlbumTracks={props.setAlbumTracks}
            />
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
            setCoverUrl={props.setCoverUrl}
            trackDuration={props.trackDuration}
            setTrackDuration={props.setTrackDuration}
            albums={props.albums}
            albumTracks={props.albumTracks}
            setAlbumTracks={props.setAlbumTracks}
            trackId={props.trackId}
            setTrackId={props.setTrackId}
          />
        </Footer>
      </Layout>
    </div>
  );
};
