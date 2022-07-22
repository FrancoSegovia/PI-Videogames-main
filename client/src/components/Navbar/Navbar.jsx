import style from "../style/Navbar.module.css";
import { Link } from 'react-router-dom';
import mushroom from '../../img/kindpng_1146449.png';
import heart from '../../img/heartwb.gif';
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch } from 'react-redux';
import { fetchGames } from '../../store/actions'

function Navbar() {

  const dispatch = useDispatch();

  let onClick = e => {
    e.preventDefault();
    dispatch(fetchGames())
  }

  return (
    <nav className={style.laNav}>
        <div className={style.botonera}>
          <div className={style.styledBar}></div>
          <div className={style.styledBar}></div>
          <div className={style.styledBar}></div>
        </div>
        <div className={style.logoTitulo}>
            <img className={style.img} src={mushroom} alt="alt"/>
            <h1>
              <h1 to="/home" className={style.titulo} onClick={onClick}>TERCHGAMES</h1>
            </h1>
            <img className={style.img} src={mushroom} alt="alt"/>
        </div>
        <div>
          <Searchbar className={style.searchbar}></Searchbar>
        </div>
        
        <ul className={style.list}>
            <Link to="/"><img className={style.heart} src={heart} alt="alt"/></Link>
            <Link to="/create" className={style.linkStyle}><li className={style.listItem}>CREAR JUEGO</li></Link>
        </ul>

    </nav>
  )
}

export default Navbar