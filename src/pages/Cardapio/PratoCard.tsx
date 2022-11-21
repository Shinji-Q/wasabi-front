//hold it

import { prato } from "../../wasabiDB"
import { Cookies } from "../../hooks/Cookies"
import {addToSacola} from "../../hooks/Pedido"

type PratoCardProps = {
    prato:prato;
}


export function PratoCard(props:PratoCardProps) {
    function tentando (e:Event) {
        e.preventDefault
        console.log("tentando bastant");
        addToSacola(props.prato.produtoId);
        console.log(Cookies.sacola)
    }
    return(
        <div className="pratoCard">
            <div id="descricao">
                <h1 id="nome">
                    {props.prato.produtoNome}
                </h1>
                <p>
                    {props.prato.produtoDescricao}
                </p>
                {/* @ts-ignore */}
                <img style={{height:"100px",}} src={`data:image/png;base64,${props.prato.produtoImagem??""}` }/>
            </div>
            {/*@ts-ignore  */}
            <div id="acoes" onClick={tentando}>
                <button id="add">Adicionar à sacola</button>
            </div>
        </div>
    )
}