import { Header } from 'antd/es/layout/layout';
import { FC, ReactNode } from 'react';
import { DropdownProfile } from '../Dropdown/DropDown';
import style from './header.module.less';

type HeaderProps = {
  children?: ReactNode;
};

export const CustomHeader: FC<HeaderProps> = ({children, ...props}) => {
  return (
      <Header className={style.header}>
        {children}
        <DropdownProfile />
      </Header>
  );
};
