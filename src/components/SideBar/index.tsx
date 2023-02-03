import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { SpotifySvg } from '../../assets/logo';

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
  getItem('Create playlist', '4', <PlusCircleFilled />),
  getItem('Liked Songs', '5', <HeartFilled />),
];

export const SideBar: React.FC = () => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        padding: '2%',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          height: 34,
          margin: 16,
          background: '#black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {<SpotifySvg />}
        <p
          style={{
            color: 'white',
            fontSize: '22px',
            fontWeight: 'bold',
          }}
        >
          Spotify Clone
        </p>
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
