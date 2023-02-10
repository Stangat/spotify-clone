import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { SpotifySvg } from '../../assets/logo';
import styles from './sideBar.module.less';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
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
  getItem('Home', '', <HomeFilled/>),
  getItem('Search', 'search', <SearchOutlined/>),
  getItem('Your library', 'library', <ContainerOutlined />),
  getItem('Create playlist', 'playlists', <PlusCircleFilled/>),
  getItem('Liked Songs', 'likes', <HeartFilled />),
];

export const SideBar: React.FC = () => {
  const navigate = useNavigate();

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
        onClick={({key}) => {
          navigate(key);
        }}
        style={{ backgroundColor: 'black' }}
      />
    </Sider>
  );
};
