import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import styles from './dropDown.module.less';
import { useEffect } from 'react';
import { getProfile } from '../../../api/api';
import { ProfileType } from '../../../interface/interface';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type DropdownProfileType = {
  token: string;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
  setToken: (token: string) => void;
};

export const DropdownProfile: React.FC<DropdownProfileType> = props => {
  const { t } = useTranslation();
  const logout = () => {
    props.setToken('');
    window.localStorage.removeItem('token');
  };
  const navigate = useNavigate();

  const getProfileHandler = async () => {
    const response = await getProfile(props.token);
    props.setProfile(response);
  };

  useEffect(() => {
    getProfileHandler();
  }, []);

  const onClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case '1':
        navigate(`/profile/${props.profile?.id}`);
        break;
      case '2':
        navigate(`/settings`);
        break;
      case '3':
        {
          logout();
        }
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: `${t('profileDrop')}`,
      key: '1',
    },
    {
      label: `${t('settings')}`,
      key: '2',
    },
    {
      label: `${t('logout')}`,
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items, onClick }} className={styles.dropDownContainer}>
      <a onClick={e => e.preventDefault()}>
        <Avatar
          size="large"
          src={
            props.profile?.images !== undefined && props.profile?.images.length > 0
              ? props.profile.images[0].url
              : undefined
          }
          icon={
            props.profile?.images === undefined || props.profile?.images.length === 0 ? <UserOutlined /> : undefined
          }
        />
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
