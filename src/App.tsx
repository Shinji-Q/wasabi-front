import React, { useState } from "react";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Link, Outlet } from "react-router-dom";
import WasabiDBApi, { cliente, usuario, venda, vendaHasProduto } from "./wasabiDB";
import { Cookies } from "./hooks/Cookies"
import Navbar from "./navbar";


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
      <>
      <Navbar />
      <div>
        <div id="content">
          <Outlet />
        </div>
        {/* static top pannel */}
      </div>
      </>

    );
  }

  static update() {
    //@ts-ignore
    window.location.reload(false);
  }

  // sacola:Map<ProdutoId, quantidade>
}


