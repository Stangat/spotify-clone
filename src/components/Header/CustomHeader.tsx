import { Header } from 'antd/es/layout/layout';
import { FC, ReactNode } from 'react';
import { DropDownProfile } from '../DropDownProfile/DropDownProfile';
import style from './header.module.less';

type HeaderProps = {
  children?: ReactNode;
};

export const CustomHeader: FC<HeaderProps> = ({children, ...props}) => {
  return (
    <Header className={style.header}>
      {children}
      <DropDownProfile />
    </Header>
  );
};
