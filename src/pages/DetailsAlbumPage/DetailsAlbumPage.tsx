import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { useParams } from 'react-router-dom';
import { AlbumType, ProfileType, ITrackTypes } from '../../../interface/interface';
import { DetailsAlbumContent } from '../../components/DetailsAlbumContent/DetailsAlbumContent';
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

type DetailsAlbumPageProps = {
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  token: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  player: HTMLAudioElement;
  songName: string;
  artistName: string;
  setSongName: (songName: string) => void;
  setArtistName: (artistName: string) => void;
  coverUrl: string;
  setCoverUrl: (coverUrl: string) => void;
  trackDuration: number;
  setTrackDuration: (trackDuration: number) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  albumTracks: ITrackTypes[];
  setAlbumTracks: (albumTracks: ITrackTypes[]) => void;
};

export const DetailsAlbumPage: React.FC<DetailsAlbumPageProps> = props => {
  const params: any = useParams();
  return (
    <div>
      <Layout hasSider>
        <Layout>
          <SideBar />
          <Layout style={{ background: 'rgb(30, 30, 30)', height: '100vh', display: 'flex' }}>
            <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} />
            <DetailsAlbumContent
              token={props.token}
              id={params.id}
              albums={props.albums}
              setALbums={props.setALbums}
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
