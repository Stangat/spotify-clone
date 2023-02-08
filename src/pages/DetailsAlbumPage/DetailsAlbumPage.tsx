import { useParams } from "react-router-dom";

export const DetailsAlbumPage = () =>{
    let params = useParams();
    console.log(params)
    return <div style={{color: 'white'}}>
        DetailsAlbumPage
    </div>
}