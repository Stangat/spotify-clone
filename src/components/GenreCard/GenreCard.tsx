import { useNavigate } from "react-router-dom";
import style from "./genreCard.module.less";

export const GenreCard: React.FC<{item: SpotifyApi.CategoryObject}> = (props) => {
  const navigate = useNavigate();

  function changeUrl() {
    navigate(`category/${props.item.id}`);
  }

  return (
    <div className={style.categorie} onClick={changeUrl}>
      <img className={style.cardImage} alt={props.item.name} src={props.item.icons[0].url}/>
      <p className={style.cardName}>{props.item.name}</p>
    </div>
  );  
}
