import { prato } from "../../wasabiDB";
import "../../../style/ProdutoCarrinho.css"
import { Cookies } from "../../hooks/Cookies";
import React from "react";
type propsProdutoCarrinho = {
    quantidade:number;
    prato:prato;
}
export function ProdutoCarrinho(props:propsProdutoCarrinho){
    var total = props.prato.produtoPreco * props.quantidade;

    return (
        <>
        </>
    )
}