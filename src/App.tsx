import React, { useState } from "react";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Link, Outlet } from "react-router-dom";


export class App extends React.Component{
  constructor(props:object){
    super(props);
  }

  render() {
    return (
    <div>
      <div id="content">
        <Outlet />
      </div>
      {/* static top pannel */}
      <section className="topbar" >
        <section className="menu">
          <img src={wasabiLogo} alt="wasabiLogo" id="logoMenu"/>
          <Link to={`/`}><span className="bottomText">inicio</span></Link>
          <Link to={`/cardapio`}><span className="bottomText">cardapio</span></Link>
          <Link to={`/cart`}><span className="bottomText">carrinho</span></Link>
          <Link to={`/login`}><span className="bottomText">perfil</span></Link>
        </section>
      </section>
    </div>

    );
  }
}

