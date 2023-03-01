import { Pagination } from 'antd';
import styles from './pagination.module.less';

type PaginationHeaderType = {
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
  limit: number;
};

export const PaginationHeader: React.FC<PaginationHeaderType> = props => {
  return (
    <div>
      <Pagination
        className={styles.paginationContainer}
        simple
        defaultCurrent={1}
        current={props.page}
        total={props.totalAlbums}
        onChange={props.setPage}
        pageSize={props.limit}
      />
    </div>
  );
};
