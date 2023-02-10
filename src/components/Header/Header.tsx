import { Header } from 'antd/es/layout/layout';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';
import { PaginationHeader } from '../Pagination/Pagination';
import { FC } from 'react';
import style from './header.module.less';

type HeaderHomeProps = {
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
};

export const HeaderHome: FC<HeaderHomeProps> = props => {
  return (
      <Header className={style.header}>
        <PaginationHeader page={props.page} setPage={props.setPage} totalAlbums={props.totalAlbums} />
        <DropdownProfile />
      </Header>
  );
};
