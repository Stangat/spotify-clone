import React from 'react';
import styles from './dropDownCopy.module.less';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { copyToClipboard } from '../../../api/api';

const items: MenuProps['items'] = [
  {
    key: '2',
    label: 'Copy link to profile',
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

export const DropDownCopy: React.FC = () => (
  <>
    <Dropdown
      menu={{ items, onClick }}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
      className={styles.dropDownProfile}
    >
      <Button>...</Button>
    </Dropdown>
  </>
);
