import { Avatar, Dropdown, MenuProps, message, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

export const DropdownProfile = () => {
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
          Name User
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
