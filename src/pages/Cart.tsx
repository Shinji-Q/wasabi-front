import { useLoaderData } from "react-router-dom";
import {Cookies} from "../hooks/Cookies"
import WasabiDBApi, { prato } from "../wasabiDB";
import { ProdutoCarrinho } from "./Carrinho/ProdutoCarrinho"
import {addToSacola, fecharPedido} from "../hooks/Pedido"

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

    function addProd(produtoId:number){
        addToSacola(produtoId);

        console.log(Cookies.sacola.get(produtoId.toString()));
        return false;
    }

    function finalizarPedido(){
        console.log('finishing')
        fecharPedido();
    }
    
    return (
        <>
        <div id="descricao">

        </div>
            {
            produtos.map(p => {
                    var quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
                    total = quantidade*p.produtoPreco;
                    return (
                        <div key={p.produtoId} className="prodCart">
                        <h1>{p.produtoNome}  {quantidade} {total}</h1>
                        <div id="controles">
                            <form key={p.produtoId}>
                                <button id="adicionar" onClick={() => addProd(p.produtoId)}>+</button>
                                <button id="removerUm">-</button>
                                <button id="removerTodos">lixinho</button>
                            </form>
                        </div>
                        </div>
                    )
            })
            }
            <div id="finalizar">
                <button onClick={()=>finalizarPedido()}>finalizar pedido</button>
            </div>
        </>
    )
}