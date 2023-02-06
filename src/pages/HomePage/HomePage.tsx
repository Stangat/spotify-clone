import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { HeaderHome } from '../../components/Header/Header';
import { HomeContent } from '../../components/HomeContent/HomeContent';
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
  borderTop: '1px solid #302f2f'
};

type HomePageProps = {
  token: string;
};
const limit = 10;
export const HomePage: React.FC<HomePageProps> = props => {
  const [page,setPage] = useState(1);
  
  return (
    <Layout hasSider>
      <Layout>
        <SideBar />
        <Layout>
          <HeaderHome page={page} setPage={setPage}/>
          <HomeContent token={props.token} offset={(page-1)*limit} limit={limit}/>
        </Layout>
      </Layout>
      <Footer style={footerStyle}>
        <Player token={props.token}/>
      </Footer>
    </Layout>
  );
};
