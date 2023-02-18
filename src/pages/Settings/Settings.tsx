import { Select } from 'antd';
import { ProfileType } from '../../../interface/interface';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './settings.module.less';
import { useTranslation } from 'react-i18next';

type SettingsProps = {
  token: string;
  setToken: (token: string) => void;
  profile: ProfileType | undefined;
  setProfile: (profile: ProfileType) => void;
};

export const Settings: React.FC<SettingsProps> = props => {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang: 'ru' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang)
  };
  return (
    <div className={style.wrapper}>
      <DropdownProfile
        setToken={props.setToken}
        profile={props.profile}
        setProfile={props.setProfile}
        token={props.token}
      />
      <div className={style.wrapperChoose}>
        <span className={style.titleBlock}>{t('settings')}</span>
        <div className={style.blockChoose}>
          <div className={style.selectBlock}>
            <span className={style.selectTitle}>{t('language')}</span>
            <span className={style.chooseTitle}>{t('choose')}</span>
          </div>
          <Select
            showSearch
            placeholder= {t('select')}
            optionFilterProp="children"
            onChange={changeLanguageHandler}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: 'en',
                label: 'English',
              },
              {
                value: 'ru',
                label: 'Русский',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
