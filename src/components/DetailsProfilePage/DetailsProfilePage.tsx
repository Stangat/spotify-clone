import { Avatar } from 'antd';
import { ProfileType } from '../../../interface/interface';
import styles from './detailsProfilePage.module.less';
import { UserOutlined } from '@ant-design/icons';

type DetailsProfilePageProps = {
  profile: ProfileType | undefined;
};

export const DetailsProfilePage: React.FC<DetailsProfilePageProps> = props => {
  console.log(props.profile);
  return (
    <div className={styles.detailsProfileContainer}>
      <div className={styles.blockProfileDescription} key={props.profile?.id}>
        <div style={{ padding: '2%' }}>
          <Avatar size={250} icon={<UserOutlined />} />
        </div>

        <div className={styles.descriptionProfile}>
          country {props.profile?.country}
          name {props.profile?.display_name}
          followers {props.profile?.followers.total}
        </div>
      </div>
    </div>
  );
};
