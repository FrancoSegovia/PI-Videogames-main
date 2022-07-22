import React, { Component } from 'react';
import style from '../style/Game.module.css';

export class Game extends Component {
  render() {
    return (
        <div className={style.cardContainer}>
          {this.props ? 
          <>
            <img className={style.imagen} src={this.props.image} alt="" />
            <h3 className={style.nombre}>{this.props.name}</h3>
            <div className={style.generos}>
              {this.props.genres?.map(genre => {
                return (
                  <p className={style.genero}>{genre}</p>
                )
              })}
            </div>
            <p className={style.nombre}>Rating: {this.props.rating}</p> 
            </>
            : <div className={style.loaderContainer}><div className={style.loader}></div></div>}

        </div>
    )
  }
}

export default Game