import React, { useState, useEffect } from 'react'
import style from "../style/Searchbar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { ALFA_ASCENDENTE, ALFA_DESCENDENTE, RATING_ASCENDENTE, RATING_DESCENDENTE } from '../../store/actions';
import { searchGames, sort, filterGameGenre, getGenres, filterGameCreated } from '../../store/actions';



function Searchbar() {
    let dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const genres = useSelector(state => state.genres);

    useEffect(() => {
      dispatch(getGenres());
    }, [])

    const onAscDescFilterChange = e => {
      dispatch(sort(e.target.value));
    }

    const onGenreFilterChange = e => {
      dispatch(filterGameGenre(e.target.value));
    }

    const onCreatedFilterChange = e => {
      dispatch(filterGameCreated(e.target.value));
    }

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

    return <div className={style.firstContainer}>
            <form onSubmit={onSubmit} className={style.form}>
                <div className={style.searchContainer}>
                  <label htmlFor="">BUSCAR JUEGO: </label>
                  <input type="text" className={style.searchinput} onChange={onChange} value={search}/>
                  <input type='submit' className={style.botonBuscar} value="BUSCAR"/>
                </div>

                <label htmlFor=""> </label>
                <div className={style.filtros}>
                  <div className={style.containerAlfaExist}>
                      <div className={style.filtroYLabel}>
                        <label htmlFor="">ORDEN ALFABÉTICO/RATING</label>
                        <select className={style.selector} name="" id="" onChange={onAscDescFilterChange}>
                            <option value="Filter">TIPO DE ORDENAMIENTO</option>
                            <option value={ALFA_ASCENDENTE}>A-Z</option>
                            <option value={ALFA_DESCENDENTE}>Z-A</option>
                            <option value={RATING_ASCENDENTE}>RATING +</option>
                            <option value={RATING_DESCENDENTE}>RATING -</option>
                        </select>
                      </div>
                      <div className={style.filtroYLabel}>
                        <label htmlFor=""> FILTRO DE ORIGEN </label>
                        <select onChange={onCreatedFilterChange} className={style.selector} name="" id="">
                            <option value="TODOS">TODOS</option>
                            <option value="CREADOS POR TI">CREADOS POR TI</option>
                        </select>
                      </div>
                  </div>
                  <div className={style.filtroYLabel}>
                    <label htmlFor=""> FILTRO POR GÉNERO </label>
                    <select onChange={onGenreFilterChange} className={style.genreSelector} name="" id="">
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
            </form>
        </div>
}

export default Searchbar