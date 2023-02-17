import { Select } from 'antd';
import { ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './settings.module.less';
type SettingsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};
const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};
export const Settings: React.FC<SettingsProps> = props => {
  return (
    <div className={style.wrapper}>
      <DropdownProfile
        setToken={props.setToken}
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
      />
      <div className={style.wrapperChoose}>
        <span className={style.titleBlock}>Settings</span>
        <div className={style.blockChoose}>
          <div className={style.selectBlock}>
            <span className={style.selectTitle}>Language</span>
            <span className={style.chooseTitle}>Choose language</span>
          </div>
          <Select
            showSearch
            placeholder="Select language"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: 'english',
                label: 'English',
              },
              {
                value: 'russian',
                label: 'Russian',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
