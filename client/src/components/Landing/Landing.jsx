import React, { Component } from 'react'
import style from "../style/Landing.module.css";
import { Link } from 'react-router-dom';
import hongo from "../../img/honguito.gif";
import press from "../../img/pressstart.gif";
import coin from "../../img/moneda.gif";

export class Landing extends Component {
  render() {
    return (
      <div>

        <div className={style.titleContainer}>
            <img className={style.coin} src={coin} alt="" />
                <h1 className={style.title}>TERCHGAMES</h1>
            <img className={style.coin} src={coin} alt="" />
        </div>
        
        <Link to="/home"><img className={style.press} src={press} alt="" /></Link>
        <br />
        <img className={style.hongo} src={hongo} alt="" />
        
      </div>
    )
  }
}

export default Landing