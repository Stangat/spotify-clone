import { Header } from 'antd/es/layout/layout';
import styles from './header.module.less';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';
import { PaginationHeader } from '../Pagination/Pagination';

type HeaderHomeProps = {
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
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
        <DropdownProfile />
      </Header>
    </div>
  );
};
