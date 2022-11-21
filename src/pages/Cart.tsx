import { useLoaderData } from "react-router-dom";
import {Cookies} from "../hooks/Cookies"
import WasabiDBApi, { prato } from "../wasabiDB";
import { ProdutoCarrinho } from "./Carrinho/ProdutoCarrinho"
import {addToSacola, removeOneFromSacola, setProdQuant, fecharPedido} from "../hooks/Pedido"
import "../../style/ProdutoCarrinho.css"
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

    function addProd(ev:React.MouseEvent<HTMLButtonElement,MouseEvent>, produtoId:number){
        ev.preventDefault();
        addToSacola(produtoId);

        console.log(Cookies.sacola.get(produtoId.toString()));
        return false;
    }

    function updateQuantidade(ev:React.ChangeEvent<HTMLInputElement>, produtoId:number){
        const updatedAmountStr = ev.target.value;
        if(updatedAmountStr !== ""){
            const updatedAmount:number = Number.parseInt(updatedAmountStr);
            if(updatedAmount > 0){
                setProdQuant(produtoId, updatedAmount)
            }
        }
    }

    function finalizarPedido(){
        console.log('finishing')
        fecharPedido().then((venda) => {
            console.log(venda);
        });
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
                            <div className="descricaoPedido" id={`produto#${p.produtoId}`}>
                                <h1>{p.produtoNome}  {total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</h1>
                            </div>
                            <div id="controles">
                                <form key={p.produtoId}>
                                    <button id="removerTodos">lixinho</button>
                                    <button id="removerUm">-</button>
                                    <input type="number" onChange={(ev) => {updateQuantidade(ev, p.produtoId)}} />
                                    <button id="adicionar" onClick={(ev) => addProd(ev, p.produtoId)}>+</button>
                                </form>
                            </div>
                        </div>
                    )
            })
            }
            <div id="finalizar">
                <button id="finalizar" name="finalizarPedido"onClick={()=>finalizarPedido()}>finalizar pedido</button>
            </div>
        </>
    )
}