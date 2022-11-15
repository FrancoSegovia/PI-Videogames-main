import React, { Component } from 'react'
import style from "../style/Landing.module.css";
import { Link } from 'react-router-dom';
import hongo from "../../img/honguito.gif";
import press from "../../img/pressstart.gif";
import coin from "../../img/moneda.gif";

export class Landing extends Component {
/*   constructor(props) {
    super(props)
    this.state = { 
      windowWidth: window.innerWidth
     };
    this.screenWidthUpdater = this.screenWidthUpdater.bind(this);
  } */
/* 
  screenWidthUpdater() { 
    this.setState({ windowWidth:this.state.windowWidth = window.innerWidth })
  };

  componentDidMount() {
    window.addEventListener("resize", this.state.screenWidthUpdater);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.state.screenWidthUpdater);
  } */

  render() {
    return (
      <div>
       {/*  <h1>{this.state.windowWidth}</h1> */}
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