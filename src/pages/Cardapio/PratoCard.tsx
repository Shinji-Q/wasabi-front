//hold it

import { prato } from "../../wasabiDB"
import { Cookies } from "../../hooks/Cookies"
import {addToSacola, removeFromSacola, removeOneFromSacola, setProdQuant} from "../../hooks/Pedido"
import React, { useState } from "react";

type PratoCardProps = {
    prato:prato;
}


export function PratoCard(props:PratoCardProps) {
    const { prato } = props
    const { produtoId } = prato

    const [inCart, setInCart] = useState(Cookies.sacola.get(produtoId.toString())!==undefined);
    const [quantidade, setQuantidade] = useState(Cookies.sacola.get(produtoId.toString())??0);

    function adicionarAoCarrinho () {
        setInCart(true);
        setQuantidade(1)
        addToSacola(produtoId);
        updateState();
    }

    function updateState(){
        const quant = Cookies.sacola.get(produtoId.toString())??0;
        if(quant === 0) {
            setInCart(false);
        } else {
            setInCart(true);
            setQuantidade(quant);
            console.log('updatgin quantidade');
            console.log(quant);
            console.log(quantidade);
        }
    }

    function removerDoCarrinho () {
        removeFromSacola(produtoId);
        updateState();
    }

    function addUm(){
        addToSacola(produtoId);
        updateState();
    }

    function remUm(){
        if(quantidade > 1) {
            removeOneFromSacola(produtoId);
        } else {
            removerDoCarrinho(produtoId);
        }
        updateState();
    }

    function alterarQuantidade(ev:React.ChangeEvent<HTMLInputElement>){
        console.log(ev.target?.value);
        if(ev.target.value !== ""){
            const q = Number.parseInt(ev.target.value);
            setProdQuant(produtoId, q);
            setQuantidade(q);
        }
    }

    return(
        <div className="pratoCard">
            <div id="descricao">
                <div className="desc">
                    <div className="descTextoCard">
                    <h1 className="nomePrato">
                        {prato.produtoNome}
                    </h1>
                    <p className="descricaoPrato">
                        {prato.produtoDescricao}
                    </p>
                    </div>
                    <div className="descFooter" >
                        <p className="preco">
                            {prato.produtoPreco.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}
                        </p>
                        <div className="acoes">
                            {!inCart &&
                                <button id="add" onClick={adicionarAoCarrinho}>Adicionar à sacola</button>
                            }
                            {inCart &&
                            <div className="cartProdControler">
                                <button className="botaoDeAcao" id="removerUm" onClick={(ev) => {remUm()}}>
                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                    </svg>
                                </button>
                                
                                <input className="mx-2 border text-center w-8" type="number"  onChange={(ev)=> {alterarQuantidade(ev)}} value={quantidade}/>

                                <button className="botaoDeAcao" id="adicionar" onClick={(ev) => {addUm()}}>
                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                                    </svg>
                                </button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <img className="imagemPratoCard"src={`data:image/png;base64,${props.prato.produtoImagem??""}` }/>
                {/* @ts-ignore */}
            </div>
            {/*@ts-ignore  */}
        </div>
    )
}