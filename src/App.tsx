import React, { useState } from "react";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import { Link, Outlet } from "react-router-dom";
import WasabiDBApi, { cliente, usuario, venda, vendaHasProduto } from "./wasabiDB";


export class App extends React.Component{
  constructor(props:object){
    super(props);
  }
  autenticado:boolean = true;
  render() {
    Cookies.initTeste();
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

export class Cookies {
  static sacola:Map<String, number> = Cookies.loadSacola() ?? new Map<String, number>();
  static user:cliente;

  static initTeste(){
    WasabiDBApi.getCliente(1).then((u) => {
      Cookies.user = u;
    })
  }

  

  static loadSacola(){

    var objSacola:Object = (JSON.parse(localStorage.getItem('sacola')?? '{}'));
    if(objSacola == null){
      return null;
    }
    var arraySacola:[String, number][] = Object.entries(objSacola);
    var sacolaCookie:Map<String,number> = new Map(arraySacola);
    return sacolaCookie;

  }

  static addToSacola(produtoId:number)/*:React.MouseEventHandler<HTMLBRElement>*/{

    var quantidade:number = (this.sacola.get(produtoId.toString()) ?? 0) + 1;

    this.setProdQuant(produtoId, quantidade);

    //salvando a sacola localmente com cookies
    localStorage.setItem('sacola', JSON.stringify(Object.fromEntries(this.sacola)))
  }


  static removeOneFromSacola(produtoId:number){

    var quantidade:number = (this.sacola.get(produtoId.toString()) ?? 0) - 1;

    this.setProdQuant(produtoId, quantidade);
    //salvando a sacola localmente com cookies
    localStorage.setItem('sacola', JSON.stringify(Object.fromEntries(this.sacola)))
    
  }
  static removeFromSacola(produtoId:number){
    this.setProdQuant(produtoId, 0);
  }
  static setProdQuant(produtoId:number, quantidade: number){

    if(quantidade > 0)
    this.sacola.set(produtoId.toString(), quantidade);

  }

  static fecharPedido(){
    var pedidos:vendaHasProduto[] = [];
    var index:number = 0;

    WasabiDBApi.getPratos()
    .then((pratos)=>{

      pratos = pratos.filter( p => {
      return Cookies.sacola.has(p.produtoId.toString());})

      var total:number = 0;
      var pedidos:vendaHasProduto[]= pratos.map((prato, index )=>{

        var quantidade = this.sacola.get(prato.produtoId.toString())?? 0;
        total += prato.produtoPreco*quantidade;
        const vendaAux:vendaHasProduto =
          {
          id:{vendaId: -1,
          produtoId:prato.produtoId},
          produto:prato,
          quantidade:quantidade,
          }
        return(vendaAux);
      })

      const vendafechada:venda = {
          vendaId: -1,
          cliente: Cookies.user,
          vendaTotal: total,
          vendaData: Date.now(),
          vendaHasProdutos: pedidos
      }
      console.log('venda');
      console.log(vendafechada);

      WasabiDBApi.postVenda(vendafechada).then( () => {

        console.log('tentando');

      }
      )

    })
    // fim then
  }
}

