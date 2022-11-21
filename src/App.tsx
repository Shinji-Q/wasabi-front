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
    this.state = {
      logado: Cookies.user !== null,
    };
  }
  autenticado:boolean = true;
  render() {

    console.log('logado?');
    console.log(Cookies.user);

    WasabiDBApi.getCliente(1).then( (user) => {
      localStorage.setItem("user", JSON.stringify(user))
      
    }

    )
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
          <Link to={`/cardapio/1`}><span className="bottomText">Cardápio</span></Link>
          <Link to={`/cart`}><span className="bottomText">Carrinho</span></Link>
          <Link to={Cookies.logado?`/user-profile`:`/login`}><span className="bottomText">{Cookies.logado?`Perfil`:`Login`}</span></Link>
        </section>
      </section>
    </div>

    );
  }

  // sacola:Map<ProdutoId, quantidade>
}


