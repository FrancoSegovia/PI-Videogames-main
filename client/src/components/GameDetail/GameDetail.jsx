import React from 'react'
import style from '../style/GameDetail.module.css';
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import mario from '../../img/mario3.jpg';
import axios from 'axios';


function GameDetail(props) {
    const gameId = props.match.params?.id
    const [game, setGame] = useState(null);


    useEffect(() => {
        axios.get(`http://https://terchgames.onrender.com/api/videogames/${gameId}`)
        .then(game => setGame(game.data));
        
        return () => setGame(null);
    }, []);
    
  return (
    <div>
        { game ? <div className={style.mainContainer}>
                <div className={style.cardContainer}>
                    <div className={style.containerEstetico}>
                        <img className={style.img} src={game.image ? game.image : mario} alt="" />
                        <div className={style.containerEsteticoDos}>
                            <h3 className={style.name} >{game.name?.toUpperCase()}</h3>
                            <div className={style.genresContainer}> Géneros:
                                {game.genres?.map(genre => {
                                    return (
                                    <p className={style.genre}>{genre.name}</p>
                                    )
                                })}
                            </div> 
                            <div className={style.plataformas}>Plataformas:{ gameId.length < 6 ? game.platforms?.map(platform => {return <p className={style.plataforma}>{platform}</p>})
                            :   game.platforms?.map(platform => {return <p className={style.plataforma}>{platform}</p>})}
                            </div>
                        </div>
                    </div>
                    <p className={style.fecha}>Fecha de lanzamiento: {game.release_date?.slice(0,10)}</p>
                    <p className={style.rating}>Rating: {game.rating}</p>
                    <h4 className={style.description}>Descripción: {game.description?.replace(/<[^>]*>/g, '').replace(/&#39;/g, "'")}</h4>
                    
                </div>
                <Link to="/home" className={style.backButton}>REGRESAR</Link>
                </div>
        
        : <div className={style.loaderContainer}><div className={style.loader}></div></div>
        }
    </div>
  )
}

export default GameDetail