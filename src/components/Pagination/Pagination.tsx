import { Pagination } from "antd"

type PaginationHeaderType = {
    page: number;
    setPage: (page: number) => void;
}
export const PaginationHeader: React.FC<PaginationHeaderType> = (props) => {
    return <div>
        <Pagination simple defaultCurrent={1} total={50} onChange={props.setPage}/>
    </div>
}