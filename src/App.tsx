import { useState } from "react";
import { Card } from "./components/Card";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Outlet } from "react-router-dom";


export function App() {
  //imutabilidade

  return (
  <div>
    <div id="content">
      <Outlet />
    </div>
    <section className="topbar" >
      <section className="menu">
        <img src={wasabiLogo} alt="wasabiLogo" id="logoMenu"/>
        <a href={`/`}><span className="bottomText">inicio</span></a>
        <a href={`cardapio`}><span className="bottomText">cardapio</span></a>
        <a href={`cart`}><span className="bottomText">carrinho</span></a>
        <a href={`login`}><span className="bottomText">perfil</span></a>
      </section>
    </section>
  </div>

  );

}

export default App
