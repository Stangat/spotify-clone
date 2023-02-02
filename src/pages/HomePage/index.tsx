import { Layout } from 'antd';
import React from 'react';
import { HeaderHome } from '../../ts/components/Header';
import { HomeContent } from '../../ts/components/HomeContent';
import { SideBar } from '../../ts/components/SideBar';
import styles from './styles.module.less';

export const HomePage = () => {
  return (
    <Layout hasSider>
      <SideBar />
      <Layout className="site-layout" style={{ marginLeft: 200, backgroundColor: '#1e1e1e' }}>
        <HeaderHome />
        <HomeContent />
      </Layout>
    </Layout>
  );
};
