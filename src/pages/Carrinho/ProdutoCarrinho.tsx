import { prato } from "../../wasabiDB";
import "../../../style/ProdutoCarrinho.css"
import { Cookies } from "../../hooks/Cookies";
import {addToSacola, setProdQuant, fecharPedido, removeOneFromSacola} from "../../hooks/Pedido";
import React from "react";
import { App } from "../../App";
import {removeFromSacola} from "../../hooks/Pedido"

type propsProdutoCarrinho = {
    prato:prato;
    updateHook:()=>void;
}

export class ProdutoCarrinho extends React.Component{
    prod:prato;
    updateHook:()=>void;
    quantidade:number;

    constructor(props:propsProdutoCarrinho){
        super(props);
        this.prod = props.prato;
        // ??0 pra parar de dar warning
        this.quantidade = Cookies.sacola.get(props.prato.produtoId.toString())??0;
        this.state = {
            quantidade: this.quantidade,
        }
        this.updateHook = props.updateHook;
        this.update = this.update.bind(this);
    }

    update() {
        this.setState((state) => {

        this.quantidade = Cookies.sacola.get(this.prod.produtoId.toString())??0;

        return ({quantidade: this.quantidade,})
            
        })
    }

    render () {
        const idProduto = this.prod.produtoId;
        const total = this.prod.produtoPreco * this.quantidade;

        return (
        <>
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src={`data:image/png;base64,${this.prod.produtoImagem??""}` } alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow" id={`produto#${this.prod.produtoId}`}>
              <span className="font-bold text-sm">{this.prod.produtoNome}</span>
              <span className="text-red-500 text-xs">{this.prod.produtoDescricao}</span>
              <button className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={(ev) => {removeFromSacola(this.prod.produtoId); this.updateHook()}}>Remove</button>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
          <form key={this.prod.produtoId}>

            <button id="removerUm" onClick={(ev) => {this.remOne(ev, this.prod.produtoId);this.updateHook()}}>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
            </button>
            
            <input className="mx-2 border text-center w-8" type="number"  onChange={(ev) => {this.updateQuantidade(ev, this.prod.produtoId);this.updateHook()}} defaultValue={1} value={this.quantidade}/>

            <button id="adicionar" onClick={(ev) => {this.addProd(ev, this.prod.produtoId);this.updateHook()}}>
                
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
            </button>
            </form>

          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{this.prod.produtoPreco}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span>
        </div>
            
        </>
        )
    }

    addProd(ev:React.MouseEvent<HTMLButtonElement,MouseEvent>, produtoId:number){
        ev.preventDefault();
        addToSacola(produtoId);

        console.log(Cookies.sacola.get(produtoId.toString()));
        this.update();
        return true;
    }

    remOne(ev:React.MouseEvent<HTMLButtonElement,MouseEvent>, produtoId:number){
        ev.preventDefault();
        removeOneFromSacola(produtoId);

        console.log(Cookies.sacola.get(produtoId.toString()));
        this.update();
        return false;
    }

    updateQuantidade(ev:React.ChangeEvent<HTMLInputElement>, produtoId:number){
        const updatedAmountStr = ev.target.value;
        if(updatedAmountStr !== ""){
            const updatedAmount:number = Number.parseInt(updatedAmountStr);
            if(updatedAmount > 0){
                setProdQuant(produtoId, updatedAmount)
                this.update();
            }
        }
    }
}