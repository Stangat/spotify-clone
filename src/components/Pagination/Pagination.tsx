import { Pagination } from 'antd';

type PaginationHeaderType = {
  page: number;
  setPage: (page: number) => void;
  totalAlbums: number;
};
export const PaginationHeader: React.FC<PaginationHeaderType> = props => {
  return (
    <div>
      <Pagination simple defaultCurrent={1} current={props.page} total={props.totalAlbums} onChange={props.setPage} />
    </div>
  );
};
