import React, { FC } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { copyToClipboard } from '../../../api/api';
import { useTranslation } from 'react-i18next';
import styles from './dropDownCopy.module.less';

const Points: FC = () => {
  return (
    <svg className={styles.svg} role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" fill='hsla(0,0%,100%,.6)'>
    <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg>
  );
}

export const DropDownCopy: React.FC = () => {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: `${t('copylink')}`,
    },
  ];

  const onClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case '2':
        {
          copyToClipboard();
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Dropdown
        menu={{ items, onClick }}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
        className={styles.dropDownProfile}
      >
      <Button><Points></Points></Button>
      </Dropdown>
    </>
  );
};
