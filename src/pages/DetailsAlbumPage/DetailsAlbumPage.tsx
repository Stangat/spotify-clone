import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { useParams } from 'react-router-dom';
import { AlbumType } from '../../../interface/interface';
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
};

export const DetailsAlbumPage: React.FC<DetailsAlbumPageProps> = props => {
  const params: any = useParams();
  return (
    <div>
      <Layout hasSider>
        <Layout>
          <SideBar />
          <Layout style={{ background: 'rgb(30, 30, 30)', height: '100vh', display: 'flex' }}>
            <DropdownProfile />
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
          />
        </Footer>
      </Layout>
    </div>
  );
};
