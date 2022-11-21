import React, { useState } from "react";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Link, Outlet } from "react-router-dom";
import WasabiDBApi, { cliente, usuario, venda, vendaHasProduto } from "./wasabiDB";
import { Cookies } from "./hooks/Cookies"
import Navbar from "./navbar";
import "../style/tailwind.css"


export class App extends React.Component{
  constructor(props:object){
    super(props);
  }
  autenticado:boolean = true;
  render() {
    Cookies.initTeste();
    console.log(Cookies.user);
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

  // sacola:Map<ProdutoId, quantidade>
}


