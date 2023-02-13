import { Header } from 'antd/es/layout/layout';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';
import { PaginationHeader } from '../Pagination/Pagination';
import { FC } from 'react';
import style from './header.module.less';
import { ProfileType } from '../../../interface/interface';

type HeaderHomeProps = {
  token: string;
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const HeaderHome: FC<HeaderHomeProps> = props => {
  return (
      <Header className={style.header}>
        <PaginationHeader page={props.page} setPage={props.setPage} totalAlbums={props.totalAlbums} />
        <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} />
      </Header>
  );
};
