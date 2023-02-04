import { Header } from 'antd/es/layout/layout';
import styles from './header.module.less';
import {} from '@ant-design/icons';
import { DropdownProfile } from '../Dropdown/DropDown';





export const HeaderHome: React.FC = () => {
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
        <DropdownProfile />
      </Header>
    </div>
  );
};
