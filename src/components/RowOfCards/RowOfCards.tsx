import { FC, ReactNode } from "react";
import style from './rowOfCards.module.less';

export const RowOfCards : FC<{title: string, children: ReactNode}> = ({title, children}) => {
  return (
    <section className={style.row}>
      <h2 className={style.rowHeader}>{title}</h2>
      <div className={style.rowContent}>
        {children}
      </div>
    </section>
  );
};
