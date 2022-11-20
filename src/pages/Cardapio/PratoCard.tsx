//hold it

import { prato } from "../../wasabiDB"
import { addToSacola } from "../../main"

type PratoCardProps = {
    prato:prato;
}


export function PratoCard(props:PratoCardProps) {
    function tentando (e:Event) {
        e.preventDefault
        console.log("tentando bastant");
        addToSacola(props.prato.produtoId);
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
            </div>
            {/*@ts-ignore  */}
            <div id="acoes" onClick={tentando}>
                <button id="add">Adicionar à sacola</button>
            </div>
        </div>
    )
}