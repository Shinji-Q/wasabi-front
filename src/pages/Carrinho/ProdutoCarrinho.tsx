import { prato } from "../../wasabiDB";
import "../../../style/ProdutoCarrinho.css"
import { Cookies } from "../../hooks/Cookies";
import {addToSacola, setProdQuant, fecharPedido, removeOneFromSacola} from "../../hooks/Pedido";
import React from "react";

type propsProdutoCarrinho = {
    prato:prato;
}

export class ProdutoCarrinho extends React.Component{
    prod:prato;
    quantidade:number;

    constructor(props:propsProdutoCarrinho){
        super(props);
        this.prod = props.prato;
        // ??0 pra parar de dar warning
        this.quantidade = Cookies.sacola.get(props.prato.produtoId.toString())??0;
        this.state = {
            quantidade: this.quantidade,
        }
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
            <div className="descricaoPedido" id={`produto#${this.prod.produtoId}`}>
                <h1>{this.prod.produtoNome}</h1>
                <h1 id={`total#${this.prod.produtoId}}`}>{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</h1>
            </div>
            <div id="controles">
                <form key={this.prod.produtoId}>
                    <button id="removerTodos">lixinho</button>
                    <button id="removerUm" onClick={(ev) => {this.remOne(ev, this.prod.produtoId)}}>-</button>
                    <input 
                        name="inQuant"
                        type="number"  
                        onChange={(ev) => {this.updateQuantidade(ev, this.prod.produtoId)}} 
                    />
                    <button id="adicionar" onClick={(ev) => {this.addProd(ev, this.prod.produtoId)}}>+</button>
                </form>
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