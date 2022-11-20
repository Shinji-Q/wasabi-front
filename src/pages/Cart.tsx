import { useLoaderData } from "react-router-dom";
import {Cookies} from "../App"
import WasabiDBApi, { prato } from "../wasabiDB";
import { ProdutoCarrinho } from "./Carrinho/ProdutoCarrinho"


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

    var total:number = 0.00;

    var auxQuantPrato:number;

    function addProd(produtoId:number){
        Cookies.addToSacola(produtoId);

        console.log(Cookies.sacola.get(produtoId.toString()));
        return false;
    }

    function finalizarPedido(){
        console.log('finishing')
        Cookies.fecharPedido();
    }
    
    return (
        <>
        <div id="descricao">

        </div>
            {
            produtos.map(p => {
                    return (
                        <div key={p.produtoId} className="prodCart">
                        <h1>{p.produtoNome}  {auxQuantPrato} {total}</h1>
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