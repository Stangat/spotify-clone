import { Header } from 'antd/es/layout/layout';
import { FC, ReactNode } from 'react';
import { ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../Dropdown/DropDown';
import style from './header.module.less';

type HeaderProps = {
  children?: ReactNode;
  token: string;
  setToken: (token:string)=>void
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const CustomHeader: FC<HeaderProps> = ({children, ...props}) => {
  return (
    <Header className={style.header}>
      {children}
      <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken}/>
    </Header>
  );
};
