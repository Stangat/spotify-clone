import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './dropDown.module.less';
import { useEffect } from 'react';
import { getProfile } from '../../../api/api';
import { ProfileType } from '../../../interface/interface';
import { useNavigate } from 'react-router-dom';

type DropdownProfileType = {
  token: string;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  setToken: (token:string)=>void
};

export const DropdownProfile: React.FC<DropdownProfileType> = props => {
  const logout = () => {
    props.setToken("")
    window.localStorage.removeItem("token")
  }
  const navigate = useNavigate();

  const getProfileHandler = async () => {
    const response = await getProfile(props.token);
    props.setProfile(response);
  };

  useEffect(() => {
    getProfileHandler();
  }, []);

  const onClick: MenuProps['onClick'] = e => {
    //console.log('click ', e);
    switch (e.key) {
      case '1':
        navigate(`/profile/${props.profile?.id}`);
        break;
      case '2':
        navigate(`/settings`);
        break;
      case '3':
        {logout()}
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
    },
    {
      label: 'Settings',
      key: '2',
    },
    {
      label: 'Log out',
      key: '3',
    },
  ];
  return (
    <Dropdown menu={{ items, onClick }} className={styles.dropDownContainer}>
      <a onClick={e => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />}/>
        <Space
          style={{
            color: 'white',
            fontWeight: '600',
          }}
        >
          {props.profile?.display_name}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
