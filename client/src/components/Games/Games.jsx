import React from 'react'
import style from '../style/Games.module.css';
import Game from '../Game/Game.jsx';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../store/actions'
import { Link } from 'react-router-dom';
import mario from '../../img/mario3.jpg';

function Games() {
  let games = useSelector(state => state.filteredGames);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const [juegosPorPagina] = useState(15);
  const ultimaPagina = Math.ceil(games.length / juegosPorPagina);
  const ultimoJuego = paginaActual !== ultimaPagina ? paginaActual * juegosPorPagina : 100
  const primerJuego = ultimoJuego - juegosPorPagina;
  
  const gamesRecortado = games.length <= 15 ? games : games.slice(primerJuego, ultimoJuego);

  
  
  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
    dispatch(fetchGames())
  }, []);

  const previousPage = () => {
    if (paginaActual === 1) setPaginaActual(1);
    else  {
      setPaginaActual(paginaActual - 1);
      ref.current?.scrollIntoView({behavior: 'smooth'});
    }
  };

  const nextPage = () => {
    if (paginaActual >= ultimaPagina ) setPaginaActual(ultimaPagina);
    else {
      setPaginaActual(paginaActual + 1);
      ref.current?.scrollIntoView({behavior: 'smooth'});
      console.log(paginaActual);
    }
  };
  
  return (
    <div ref={ref} className={style.superContainer}>
        { gamesRecortado.length 
                ? <>
                    <div className={style.topPagination}>
                          <button onClick={previousPage} className={style.paginationPrevious}>ANTERIOR</button>
                          <button onClick={nextPage} className={style.paginationNext}>SIGUIENTE</button>
                    </div>

                    <div className={style.generalContainer}>
                        <div className={style.cardsContainer}>
                            {(Array.isArray(gamesRecortado) ? gamesRecortado?.map(game => {
                                return <Link key={game.id} className={style.link} to={`/home/${game.id}`}>
                                        <Game 
                                          image={game.image ? game.image : mario }
                                          name={game.name}
                                          genres={game.genres}
                                          rating={game.rating}
                                        />
                                      </Link>
                              })
                              : <p className={style.errorMessage}>NO EXISTEN JUEGOS RELACIONADOS</p>
                              )}
                        </div>       
                    </div>

                    <div className={style.pagination}>
                        <button onClick={previousPage} className={style.paginationPrevious}>ANTERIOR</button>
                        <button onClick={nextPage} className={style.paginationNext}>SIGUIENTE</button>
                    </div>
                  </>

                : <div className={style.loaderContainer}><div className={style.loader}></div></div> 

        }
                        
    </div>
  )
}

export default Games