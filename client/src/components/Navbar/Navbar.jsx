import style from "../style/Navbar.module.css";
import { Link } from 'react-router-dom';
import mushroom from '../../img/kindpng_1146449.webp';
import heart from '../../img/heartwb.gif';
import exSearchStyle from "../style/Searchbar.module.css";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from 'react-redux';
import { ALFA_ASCENDENTE, ALFA_DESCENDENTE, RATING_ASCENDENTE, RATING_DESCENDENTE } from '../../store/actions';
import { fetchGames, getGenres, sort, filterGameCreated, filterGameGenre } from '../../store/actions'
import { useEffect, useState } from "react";

function Navbar() {

  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const screenWidthUpdater = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    dispatch(getGenres());
    window.addEventListener("resize", screenWidthUpdater)

    return () => {
      window.removeEventListener("resize", screenWidthUpdater);
    }
  }, [])

  let onClick = e => {
    e.preventDefault();
    dispatch(fetchGames())
  }

  const onAscDescFilterChange = e => {
    dispatch(sort(e.target.value));
  }

  const onGenreFilterChange = e => {
    dispatch(filterGameGenre(e.target.value));
  }

  const onCreatedFilterChange = e => {
    dispatch(filterGameCreated(e.target.value));
  }

  const onBurgerClick = () => {
    isSideOpen === false ? 
                setIsSideOpen(true) : 
                setIsSideOpen(false)
  }

  const onSearchClick = () => {
    isSearchOpen === false ? 
                setIsSearchOpen(true) : 
                setIsSearchOpen(false)
  }

  return (
    <nav className={style.laNav}>
        <div className={style.botonera}>
          <div className={style.styledBar}></div>
          <div className={style.styledBar}></div>
          <div className={style.styledBar}></div>
        </div>
        <div className={windowWidth < 600 ? style.logoTituloS : style.logoTitulo}>
            <img className={style.img} src={mushroom} alt="alt"/>
            <h1 to="/home" className={windowWidth < 600 ? style.tituloS : style.titulo} onClick={onClick}>TERCHGAMES</h1>
            <img className={style.img} src={mushroom} alt="alt"/>
        </div>

        { windowWidth >= 992 
        ? <Searchbar className={style.searchbar}></Searchbar> 
        : <div className={style.searchButtonWrapper} onClick={onSearchClick}>
            <div className={style.searchButton}></div>
          </div>}

        { windowWidth >= 992 || !isSearchOpen
        ? <></>
        : <div className={style.searchbarWrapper}>
            <Searchbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
          </div>
        }

        

        {isSideOpen
        ? 
        <>
            <div className={exSearchStyle.sidebar}>
                        <div className={exSearchStyle.filtros}>
                        <div className={exSearchStyle.containerAlfaExist}>
                          <div className={exSearchStyle.filtroYLabel}>
                            <label htmlFor="">ORDENAMIENTOS</label>
                            <select className={exSearchStyle.selector} name="" id="" onChange={onAscDescFilterChange}>
                                <option>ORDENAMIENTO</option>
                                <option value={ALFA_ASCENDENTE}>A-Z</option>
                                <option value={ALFA_DESCENDENTE}>Z-A</option>
                                <option value={RATING_ASCENDENTE}>RATING +</option>
                                <option value={RATING_DESCENDENTE}>RATING -</option>
                            </select>
                          </div>
                          <div className={exSearchStyle.filtroYLabel}>
                            <label htmlFor=""> FILTRO POR ORIGEN </label>
                            <select onChange={onCreatedFilterChange} className={exSearchStyle.selector} name="" id="">
                                <option value="TODOS">ORIGEN</option>
                                <option value="EXTERNOS">EXTERNOS</option>
                                <option value="CREADOS POR TI">CREADOS POR TI</option>
                            </select>
                          </div>
                      
                      <div className={exSearchStyle.filtroYLabel}>
                        <label htmlFor=""> FILTRO POR GÉNERO </label>
                        <select onChange={onGenreFilterChange} className={exSearchStyle.genreSelector} name="" id="">
                          <option value="Genre">GÉNERO</option>
                            {
                              genres?.map(genre => {
                                return (
                                  <option value={genre.name}>{genre.name.toUpperCase()}</option>
                                )
                              })
                            }
                        </select>
                      </div>
                    
                </div>

        </div>
        <ul className={style.list}>
            <Link to="/create" className={style.linkStyle}><li className={style.listItem}>CREAR JUEGO</li></Link>
            <Link to="/"><img className={style.heart} src={heart} alt="alt"/></Link>
        </ul>

        </div>
        
        
        </>
        : <></>
        
        }

        <div className={style.burgerButtonWrapper} onClick={onBurgerClick}>
          <div className={style.burgerButton}></div>
        </div>

        
        

    </nav>
  )
}

export default Navbar