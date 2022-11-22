//hold it

import { prato } from "../../wasabiDB"
import { Cookies } from "../../hooks/Cookies"
import {addToSacola, removeFromSacola} from "../../hooks/Pedido"
import { useState } from "react";

type PratoCardProps = {
    prato:prato;
}


export function PratoCard(props:PratoCardProps) {

    const [inCart, setInCart] = useState(Cookies.sacola.get(props.prato.produtoId.toString())!==undefined);
    const [quantidade, setQuantidade] = useState(0);

    function adicionarAoCarrinho (e:Event) {
        e.preventDefault;
        setInCart(true);
        setQuantidade(1)
        addToSacola(props.prato.produtoId);
    }

    function removerDoCarrinho (e:Event) {
        e.preventDefault;
        setInCart(false);
        setQuantidade(0);
        removeFromSacola(props.prato.produtoId);
    }

    function addUm(){
        setQuantidade(quantidade+1);
    }

    function remUm(){
        setQuantidade(quantidade-1);
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
            <div id="acoes" onClick={adicionarAoCarrinho}>
                {!inCart &&
                    <button id="add">Adicionar à sacola</button>
                }
                {inCart &&
                <>
                    <button className="botaoDeAcao" id="removerUm" onClick={(ev) => {}}>
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>
                    </button>
                    
                    <input className="" type="number"  onChange={(ev) => {}} defaultValue={1} value={quantidade}/>

                    <button className="botaoDeAcao" id="adicionar" onClick={(ev) => {}}>
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