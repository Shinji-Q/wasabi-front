import { Cookies } from "../hooks/Cookies";
import { addToSacola, fecharPedido } from "../hooks/Pedido";
import { cliente, endereco, prato } from "../wasabiDB";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/FinalizarPedido.css"

export function FinalizarPedido() {
    var pratosSacola:prato[] = JSON.parse(localStorage.getItem('sacola_detalhada')??"{}");
    var [showConfirm, revelarConfirm]= useState(false);

    function finalizar(){
        fecharPedido().then((venda) => {
            revelarConfirm(true);
            console.log('pedido Fechado!');
            console.log(venda);
        });
    }
    function escreverEndereco(endereco:endereco):String{
        return(`${endereco.enderecoEstado} - ${endereco.enderecoCidade} - ${endereco.enderecoBairro}, ${endereco.enderecoRua}`);
    }
    var total = 0.0;
    const user = Cookies.user as cliente;
    if (Cookies.sacola.size ===0) {
        window.alert("seu carrinho está vazio!");
        window.location.assign("/cart")
    }

    return (
        <div id="nota">
            <div id="header">
                <div id="info_cliente">
                    <p>Cliente: {user.clienteNome} {user.clienteSobrenome} - {user.clienteCpf}</p>
                    <p>Endereço de entrega: {escreverEndereco(user.enderecos[0])}</p>
                    <p>{user.clienteNome}</p>

                </div>

            </div>
            <div id="desc">
            {
                pratosSacola.map((prato) => {
                    const {produtoId, produtoNome, produtoPreco , produtoDescricao} = prato
                    const quantidade = Cookies.sacola.get(produtoId.toString())?? 1;
                    const preco = produtoPreco;
                    const subTotal = quantidade * preco;
                    total += subTotal;
                    return (
                    <>
                    <div className="descPedido" key={produtoId}>
                        {/* alinhado à esquerda */}
                        <div className="descricao">
                            <h1 className="nome">
                                {produtoNome}
                            </h1>
                            <p className="desc">
                                {produtoDescricao}
                            </p>
                        </div>
                        {/* alinhado à direita */}
                        <div className="quantidade">
                            {quantidade.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})} 
                            x {preco} =  {subTotal.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}
                        </div>

                    </div>
                    </>
                    
                    )

                })
            }

            </div>
            <div id="footer">
            <p>Total: {total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</p>
                <button id="confirmar" onClick={() => finalizar()}>Confirmar Pedido</button>
            </div>

            {
                showConfirm &&
                <div id="dimm">
                    <div id="pedido_confirmado">
                        <h1>Seu pedido foi confirmado :)</h1>
                        <Link id="voltar" to="/"><p className="vCenter">Voltar para o início</p></Link>
                    </div>
                </div>
            }
        </div>
    )
}