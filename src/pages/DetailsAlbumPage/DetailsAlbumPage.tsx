import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { useParams } from 'react-router-dom';
import { AlbumType } from '../../../interface/interface';
import { DetailsAlbumContent } from '../../components/DetailsAlbumContent/DetailsAlbumContent';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import { Player } from '../../components/Player/Player';
import { SideBar } from '../../components/SideBar/SideBar';

type DetailsAlbumPageProps = {
  token: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

export const DetailsAlbumPage: React.FC<DetailsAlbumPageProps> = props => {
  let params: any = useParams();
  return (
    <div>
      <Layout hasSider >
        <Layout>
          <SideBar/>
          <Layout style={{ background: 'rgb(30, 30, 30)', height: '100vh', display: 'flex' }}>
            <DropdownProfile />
            <DetailsAlbumContent token={props.token} id={params.id} albums={props.albums} setALbums={props.setALbums}/>
          </Layout>
        </Layout>
        <Footer>
          <Player token={props.token} />
        </Footer>
      </Layout>
    </div>
  );
};
