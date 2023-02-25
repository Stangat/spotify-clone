import { Header } from 'antd/es/layout/layout';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';
import { FC } from 'react';
import style from './header.module.less';
import { ProfileType } from '../../../interface/interface';

type HeaderHomeProps = {
  token: string;
  setToken: (token:string)=>void
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const HeaderHome: FC<HeaderHomeProps> = props => {
  return (
      <Header className={style.header}>
        <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken}/>
      </Header>
  );
};
