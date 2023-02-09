import { Layout } from 'antd';
import { SideBar } from '../../components/SideBar/SideBar';
import { Player } from '../../components/Player/Player';
import { Footer } from 'antd/es/layout/layout';

export const SearchPage = ({token} : {token: string}) => {
  return (<div>
    <Layout hasSider>
      <SideBar/>
      <Footer>
        <Player token={token}/>
      </Footer>
    </Layout>
  </div>);
};
