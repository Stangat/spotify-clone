import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { SpotifySvg } from '../../assets/logo';
import styles from './sideBar.module.less';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1', <HomeFilled />),
  getItem('Search', '2', <SearchOutlined />),
  getItem('Your library', '3', <ContainerOutlined />),
  getItem('Create playlist', '4', <PlusCircleFilled/>),
  getItem('Liked Songs', '5', <HeartFilled />),
];

export const SideBar: React.FC = () => {
  return (
    <Sider>
      <div  className={styles.titleBlock}>
        <SpotifySvg />
        <p>Spotify Clone</p>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
        style={{ backgroundColor: 'black' }}
      />
    </Sider>
  );
};
