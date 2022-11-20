import React, { useState } from "react";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Link, Outlet } from "react-router-dom";
import WasabiDBApi, { cliente, usuario, venda, vendaHasProduto } from "./wasabiDB";
import { Cookies } from "./hooks/Cookies"

export class App extends React.Component{
  constructor(props:object){
    super(props);
  }
  autenticado:boolean = true;
  render() {
    Cookies.initTeste();
    console.log(Cookies.user);
    return (
    <div>
      <div id="content">
        <Outlet />
      </div>
      {/* static top pannel */}
      <section className="topbar" >
        <section className="menu">
          <img src={wasabiLogo} alt="wasabiLogo" id="logoMenu"/>
          <Link to={`/`}><span className="bottomText">Início</span></Link>
          <Link to={`/cardapio`}><span className="bottomText">Cardápio</span></Link>
          <Link to={`/cart`}><span className="bottomText">Carrinho</span></Link>
          <Link to={`/login`}><span className="bottomText">Perfil</span></Link>
        </section>
      </section>
    </div>

    );
  }

  // sacola:Map<ProdutoId, quantidade>
}


