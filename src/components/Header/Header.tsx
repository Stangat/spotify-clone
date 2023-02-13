import { Header } from 'antd/es/layout/layout';
import styles from './header.module.less';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';
import { PaginationHeader } from '../Pagination/Pagination';
import { ProfileType } from '../../../interface/interface';

type HeaderHomeProps = {
  token: string;
  setToken: (token:string)=>void
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const HeaderHome: React.FC<HeaderHomeProps> = props => {
  return (
    <div className={styles.headerHome}>
      <Header
        style={{
          padding: 0,
          backgroundColor: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PaginationHeader page={props.page} setPage={props.setPage} totalAlbums={props.totalAlbums} />
        <DropdownProfile profile={props.profile} setProfile={props.setProfile} token={props.token} setToken={props.setToken}/>
      </Header>
    </div>
  );
};
