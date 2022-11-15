import React, { useState, useEffect } from 'react'
import style from "../style/Searchbar.module.css";
import { useDispatch } from 'react-redux';
import { searchGames } from '../../store/actions';



function Searchbar({ isSearchOpen, setIsSearchOpen }) {
    let dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const screenWidthUpdater = () => {
      setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener("resize", screenWidthUpdater);
    
      return () => {
        window.removeEventListener("resize", screenWidthUpdater);   
      }
    }, [])
    

    const onChange =  e => {
      setSearch(e.target.value);
    }

    const onSubmit = e => {
      e.preventDefault();
      if (search && search.trim().includes(" ")) {
        const searchTrans = search.split(" ").join("-").toLowerCase();
        dispatch(searchGames(searchTrans));
      }
      if (search === '') {
        dispatch(searchGames(search));
      }
      if (search) {
        dispatch(searchGames(search.toLowerCase().trim()));
      }
    }

    return <div className={(windowWidth >= 992 && isSearchOpen) || !isSearchOpen ? style.firstContainer : style.firstContainerS}>
            <form onSubmit={onSubmit} className={style.form}>
                <div className={(windowWidth >= 992 && isSearchOpen) || !isSearchOpen ? style.searchContainer : style.searchContainerS}>
                  {(windowWidth >= 992 && isSearchOpen) || !isSearchOpen ?  <label htmlFor="">BUSCAR JUEGO: </label> : <></> }
                  <input type="text" className={style.searchinput} onChange={onChange} value={search}/>
                  <input type='submit' className={style.botonBuscar} value="BUSCAR"/>
                </div>

            </form>
        </div>
}

export default Searchbar