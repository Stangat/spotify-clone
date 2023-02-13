import React from 'react';
import styles from './dropDownProfile.module.less';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { copyToClipboard } from '../../../api/api';

const items: MenuProps['items'] = [
/*   {
    key: '1',
    label: 'Edit profile',
  }, */
  {
    key: '2',
    label: 'Copy link to profile',
  },
];

const onClick: MenuProps['onClick'] = e => {
    //console.log('click ', e);
    switch (e.key) {
/*       case '1':
console.log('modal')
        break; */
      case '2':
       {copyToClipboard()}
        break;
      default:
        break;
    }
  };

export const DropDownProfile: React.FC = () => (
  <>
    <Dropdown menu={{ items, onClick }} placement="bottomLeft" arrow={{ pointAtCenter: true }} className={styles.dropDownProfile}>
      <Button>...</Button>
    </Dropdown>
  </>
);
