//hold it

import { prato } from "../../wasabiDB"
import { Cookies } from "../../hooks/Cookies"
import {addToSacola, removeFromSacola, removeOneFromSacola, setProdQuant} from "../../hooks/Pedido"
import React, { useState } from "react";

type PratoCardProps = {
    prato:prato;
}


export function PratoCard(props:PratoCardProps) {
    const { produtoId } = props.prato

    const [inCart, setInCart] = useState(Cookies.sacola.get(produtoId.toString())!==undefined);
    const [quantidade, setQuantidade] = useState(Cookies.sacola.get(produtoId.toString())??0);

    function adicionarAoCarrinho () {
        setInCart(true);
        setQuantidade(1)
        addToSacola(produtoId);
    }

    function removerDoCarrinho () {
        removeFromSacola(produtoId);
        setQuantidade(0);
        setInCart(false);
    }

    function addUm(){
        addToSacola(produtoId);
        setQuantidade(Cookies.sacola.get(produtoId.toString())??0);
        console.log(quantidade);
    }

    function remUm(){
        removeOneFromSacola(produtoId);
        setQuantidade(Cookies.sacola.get(produtoId.toString())??0);
        if(quantidade == 0 ){
            removerDoCarrinho();
        }
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
                <div className="descTextoCard">
                    <p id="nomePrato">
                        {props.prato.produtoNome}
                    </p>
                    <p>
                        {props.prato.produtoDescricao}
                    </p>
                </div>
                <img className="imagemPratoCard"src={`data:image/png;base64,${props.prato.produtoImagem??""}` }/>
                {/* @ts-ignore */}
            </div>
            {/*@ts-ignore  */}
            <div id="acoes" >
                {!inCart &&
                    <button id="add" onClick={adicionarAoCarrinho}>Adicionar à sacola</button>
                }
                {inCart &&
                <>
                    <button className="botaoDeAcao" id="removerUm" onClick={(ev) => {remUm()}}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>
                    </button>
                    
                    <input className="mx-2 border text-center w-8" type="number"  onChange={(ev)=> {alterarQuantidade(ev)}} defaultValue={1} value={quantidade}/>

                    <button className="botaoDeAcao" id="adicionar" onClick={(ev) => {addUm()}}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>
                    </button>
                </>
                }
            </div>
        </div>
    )
}