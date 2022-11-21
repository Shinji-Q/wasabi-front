import { Link, redirect, useLoaderData } from "react-router-dom";
import {Cookies} from "../hooks/Cookies"
import WasabiDBApi, { prato } from "../wasabiDB";
import { ProdutoCarrinho } from "./Carrinho/ProdutoCarrinho"
import {addToSacola, removeOneFromSacola, setProdQuant, fecharPedido} from "../hooks/Pedido"
import "../../style/ProdutoCarrinho.css"
import { useContext } from "react";
// recebe todos os produtos
export async function loader() {

    const produtos = await WasabiDBApi.getPratos();

    return produtos;
}


export function Cart(){

    //filtra apenas os produtos que estão na sacola
    const produtos:prato[] = (useLoaderData() as prato[]).filter( p => {
        return Cookies.sacola.has(p.produtoId.toString());
    });
    console.log(produtos);

    var total:number = 0.00;

    var auxQuantPrato:number;

    //salvando lista de produtos para não precisar usar outro get
    localStorage.setItem('sacola_detalhada', JSON.stringify(produtos));

    
    return (
        <>
        <div id="descricao">
        </div>
            {
            produtos.map(p => {
                    var quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
                    total = quantidade*p.produtoPreco;
                    //console.log(p);
                    return (
                        <ProdutoCarrinho prato={p}/>
                    )
            })
            }
            <div id="finalizar">
                <Link to="/finalizar-pedido"
                id="finalizar" 
                >finalizar pedido</Link>
            </div>
        </>
    )
}