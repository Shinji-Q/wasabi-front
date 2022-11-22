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

    const formasEntrega = [
        { nome: 'Entrega Normal', preco: 10},
        { nome: 'Entrega Express', preco:  200},
      ]
     
    function finalizarPedido(){
        console.log('finishing')
        fecharPedido().then((venda) => {
            console.log(venda);
        });
    }
    return (
        <>
        <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Carrinho</h1>
                            <h2 className="font-semibold text-2xl">{produtos.length} Items</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalhes dos Produtos</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Quantidade</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Preço</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>


                        {
                        produtos.map(p => {
                                var quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
                                total += quantidade*p.produtoPreco;
                                //console.log(p);
                                return (
                                    //@ts-ignore
                                    <ProdutoCarrinho prato={p}/>
                                )
                        })
                        }


                        <a href="/cardapio" className="flex font-semibold text-indigo-600 text-sm mt-10">

                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Comprando
                        </a>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Descrição dos Pedidos</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {produtos.length}</span>
                            <span className="font-semibold text-sm">{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Entrega</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                {
                                formasEntrega.map(entrega => {
                                    return <option value="">{entrega.nome} - R$ {entrega.preco}</option>
                                })
                                }
                            </select>
                        </div>
                        <div className="py-10">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total</span>
                                <span>{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span>
                            </div>
                            <div id="finalizar">
                                <button id="finalizar" name="finalizarPedido"onClick={()=>finalizarPedido()} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Finalizar Pedido</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        <div id="descricao">

    
        </div>

            
            
        </>
    )
}