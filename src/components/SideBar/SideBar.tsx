import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ContainerOutlined, HeartFilled, HomeFilled, SearchOutlined, PlusCircleFilled } from '@ant-design/icons';
import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { SpotifySvg } from '../../assets/logo';
import styles from './sideBar.module.less';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlaylistsType } from '../../../interface/interface';

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


export const SideBar: React.FC<{playlists: PlaylistsType | undefined}> = ({playlists}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem(`${t('home')}`, '', <HomeFilled />),
    getItem(`${t('search')}`, 'search', <SearchOutlined />),
    getItem(`${t('library')}`, 'collection/playlists', <ContainerOutlined />),
    getItem(`${t('create')}`, 'playlists', <PlusCircleFilled />),
    getItem(`${t('liked')}`, 'collection/tracks', <HeartFilled />),
  ];

  return (
    <div>
      <Sider>
        <Link to={'/'}>
          <div className={styles.titleBlock}>
            {<SpotifySvg />}
            <p>Spotify Clone</p>
          </div>
        </Link>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={items}
          onClick={({ key }) => {
            navigate(key);
          }}
          style={{ backgroundColor: 'black' }}
        />
      </Sider>
    </div>
  );
};
