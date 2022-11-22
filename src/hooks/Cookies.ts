import WasabiDBApi, {venda, cliente,prato,vendaHasProduto} from "../wasabiDB";
import React, {useState} from "react"
import { option } from "../pages/Cart";
export class Cookies {
  static sacola:Map<String, number> = Cookies.loadSacola() ?? new Map<String, number>();
  static user:cliente|null = this.loadUser();

  static tipoDeEntrega:option;

  static setTipoEntrega(novoTipo:option) {

    localStorage.setItem("tipoDeEntrega", JSON.stringify(novoTipo));
    console.log("cookie entrega setado")

  }

  static loadTipoEntrega():option | null{
    
    const cookieTipoEntrega = localStorage.getItem("tipoDeEntrega");

    if (cookieTipoEntrega !== null){
      return JSON.parse(localStorage.getItem("tipoDeEntrega")??"{}");
    }
    return null;

  }

  static dropTipoEntrega() {
    localStorage.removeItem("tipoDeEntrega");
  }

  

  static loadSacola():Map<String, number> | null{
    var cookieSacola = localStorage.getItem("sacola") ?? "";

    if(cookieSacola !== "") {
      console.log("carregando sacola");
      var objSacola:Object = (JSON.parse(cookieSacola));
      console.log('objSacola')
      console.log(objSacola)
      var arraySacola:[String, number][] = Object.entries(objSacola);
      console.log('arraySacola')
      console.log(arraySacola)
      var sacola:Map<String,number> = new Map(arraySacola);
      console.log(sacola);
      return sacola;
    } 
    return null;
  }

  static writeSacola(){
    localStorage.setItem("sacola", JSON.stringify(Object.fromEntries(this.sacola)));
  }

  static dropSacola(){
    console.log("SACOLA DELETADA")
    this.sacola = new Map();
    localStorage.setItem("sacola", "{}");
  }

  static loadUser():cliente|null{
    const cookieUser = localStorage.getItem("user")??"";
    if(cookieUser === "" ) {
      return null;
    } else {
      const user:cliente = JSON.parse(cookieUser) as cliente;
      return user;
    }
  }

  static dropUser():void {
    localStorage.removeItem("user");
  }

}