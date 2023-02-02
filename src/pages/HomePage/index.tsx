import { Layout } from 'antd';
import React from 'react';
import { HeaderHome } from '../../ts/components/Header';
import { HomeContent } from '../../ts/components/HomeContent';
import { SideBar } from '../../ts/components/SideBar';
import styles from './styles.module.less';

type HomePageProps = {
  token: string;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <Layout hasSider>
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200, backgroundColor: '#1e1e1e' }}>
        <HeaderHome />
        <HomeContent token={props.token} />
      </Layout>
    </Layout>
  );
};
