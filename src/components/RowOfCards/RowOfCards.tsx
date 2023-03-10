import { FC, ReactNode } from "react";
import style from './rowOfCards.module.less';

export const RowOfCards : FC<{title?: string, subtitle?: string, children: ReactNode, hidden?: boolean, styles?: React.CSSProperties}> =
 ({title, subtitle, children, hidden, styles}) => {
  return (
    <section className={style.row} hidden={hidden}>
      {title ? <h2 className={style.rowHeader}>{title}</h2> : ''}
      { subtitle ? <p className={style.subtitle}>{subtitle}</p> : '' }
      <div className={style.rowContent} style={styles}>
        {children}
      </div>
    </section>
  );
};
