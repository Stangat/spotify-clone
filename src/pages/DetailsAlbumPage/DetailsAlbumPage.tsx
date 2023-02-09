import { useParams } from 'react-router-dom';
import { AlbumType } from '../../../interface/interface';
import { DetailsAlbumContent } from '../../components/DetailsAlbumContent/DetailsAlbumContent';
import { DropdownProfile } from '../../components/Dropdown/DropDown';
import style from './albumDetails.module.less';

type DetailsAlbumPageProps = {
  token: string;
  albums: AlbumType[];
  setALbums: (albums: AlbumType[]) => void;
};

export const DetailsAlbumPage: React.FC<DetailsAlbumPageProps> = props => {
  let params: any = useParams(); // TODO
  return (
    <div className={style.wrapper}>
        <DropdownProfile />
        <DetailsAlbumContent token={props.token} id={params.id} albums={props.albums} setALbums={props.setALbums}/>
    </div>
  );
};
