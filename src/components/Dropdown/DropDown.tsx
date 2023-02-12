import { Avatar, Dropdown, MenuProps, message, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './dropDown.module.less';
import { useEffect, useState } from 'react';
import { getProfile } from '../../../api/api';
import { ProfileType } from '../../../interface/interface';

type DropdownProfileType = {
  token: string;
};
export const DropdownProfile: React.FC<DropdownProfileType> = props => {
  const [profile, setProfile] = useState<ProfileType>();
  const getProfileHandler = async () => {
    const response = await getProfile(props.token);
    setProfile(response);
  };

  useEffect(() => {
    getProfileHandler();
  }, []);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
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
    <Dropdown menu={{ items, onClick }}>
      <a onClick={e => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />} />
        <Space
          style={{
            color: 'white',
            fontWeight: '600',
          }}
        >
          {profile?.display_name}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
