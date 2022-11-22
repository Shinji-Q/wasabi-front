import { Link, redirect, useLoaderData } from "react-router-dom";
import {Cookies} from "../hooks/Cookies"
import WasabiDBApi, { cartao, prato } from "../wasabiDB";
import { ProdutoCarrinho } from "./Carrinho/ProdutoCarrinho"
import {addToSacola, removeOneFromSacola, setProdQuant, fecharPedido} from "../hooks/Pedido"
import "../../style/ProdutoCarrinho.css"
import { useContext, useState } from "react";
import Select  from "react-select";
import { App } from "../App";

// recebe todos os produtos

export async function loader() {

    const produtos = await WasabiDBApi.getPratos();

    return produtos;
}





export type option = {
    label: String;
    value: any;
}
export function Cart(){

    var produtosCarrinho =  (useLoaderData() as prato[]).filter( p => {
        return Cookies.sacola.has(p.produtoId.toString());
    });
    var acc:number = 0;
    const [valorEntrega, putValorEntrega] = useState(0);

    produtosCarrinho.forEach((p) =>
    {
        const quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
        acc += quantidade*p.produtoPreco;
    })

    const [prodCart, setProdCart] = useState(produtosCarrinho);
    const [total, setTotal] = useState(acc);

    function updateTotal(){
        var acc:number = 0;

        produtosCarrinho.forEach((p) =>
        {
            const quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
            acc += quantidade*p.produtoPreco;
        })
        setTotal(acc);
        console.log('updated');
    }

    console.log("produtosCarrinho");
    console.log(produtosCarrinho);

    //filtra apenas os produtos que estão na sacola


    var auxQuantPrato:number;

    const formasEntrega:option[] = [
        { label: 'Entrega Normal - R$10,00', value: 10},
        { label: 'Entrega Express - R$ 50,00', value:  50},
    ]


    var selectedCartao = -1;
    let formasDePagamento = [
        {label: 'Dinheiro (na entrega)', value:-1}
    ]
     
    function finalizarPedido(){
        console.log('finishing');
        window.location.assign("/finalizar-pedido");
        // fecharPedido().then((venda) => {
        //     console.log(venda);
        // });
    }
    //salvando lista de produtos para não precisar usar outro get
    localStorage.setItem('sacola_detalhada', JSON.stringify(produtosCarrinho));
    produtosCarrinho
    if (Cookies.user === null) {
        window.location.assign("/login");
    }

    function setValorEntrega(entrega:option){
        putValorEntrega(entrega.value as number);

        Cookies.setTipoEntrega(entrega);
        console.log('tipoDeentregacookie')
        console.log(Cookies.tipoDeEntrega);
    }
    
    return (
        <>
        <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Carrinho</h1>
                            <h2 className="font-semibold text-2xl">{produtosCarrinho?.length} Items</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalhes dos Produtos</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Quantidade</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Preço</h3>
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>


                        {
                        produtosCarrinho?.map(p => {

                                var quantidade = Cookies.sacola.get(p.produtoId.toString())??0;
                                // setTotal(total+quantidade*p.produtoPreco);
                                //console.log(p);
                                return (
                                    //@ts-ignore
                                    <ProdutoCarrinho prato={p} updateHook={updateTotal}/>
                                )
                        })
                        }


                        <a href="/cardapio/1" className="flex font-semibold text-indigo-600 text-sm mt-10">

                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Comprando
                        </a>
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10 bg-red-600">
                        <h1 className="font-semibold text-2xl border-b pb-8">Descrição dos Pedidos</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {produtosCarrinho?.length}</span>
                            <span className="font-semibold text-sm">{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block my-3 mb-3 text-sm uppercase">Forma de Pagamento</label>
                                {
                                    //@ts-ignore
                                    Cookies.user.cartaos.forEach( (c:cartao, index:number) => {
                                        console.log('cartaofredo');
                                        console.log(c);
                                        formasDePagamento = [...formasDePagamento, {label: `Cartão terminado em ${c.cartaoNumero.substring(c.cartaoNumero.length-4)}`, value: index}]

                                        console.log('cataos alfredo')
                                        console.log(Cookies.user?.cartaos);

                                        return (<option value="">{`cartão terminado em ${(c.cartaoNumero.substring(c.cartaoNumero.length-4))}`}</option>)
                                    })
                                }
                            <Select options={formasDePagamento} onChange={(par) => {selectedCartao = par?.value??-1; console.log(selectedCartao);console.log("selectedCartao^^")}}className="block p-2 text-gray-600 w-full text-sm"/>

                        </div>

                        <div>
                           
                            <label className="font-medium inline-block my-3 mb-3 text-sm uppercase">Entrega</label>
                            <Select options={formasEntrega} onChange={(par) => {setValorEntrega(par)}} className="block p-2 text-gray-600 w-full text-sm"/>
                        </div>
                        <div className="py-10">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total</span>
                                <span>{(total + valorEntrega ).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</span>
                            </div>
                            {
                            (produtosCarrinho.length !== 0) &&
                            <div id="finalizar">
                                <button id="finalizar" name="finalizarPedido"onClick={()=>finalizarPedido()} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Finalizar Pedido</button>
                            </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}