import { Cookies } from "../hooks/Cookies";
import { addToSacola } from "../hooks/Pedido";
import { prato } from "../wasabiDB";


export function FinalizarPedido() {
    var pratosSacola:prato[] = JSON.parse(localStorage.getItem('sacola_detalhada')??"{}");

    var total = 0.0;
    return (
        <>
        {
            pratosSacola.map((prato) => {
                const quantidade = Cookies.sacola.get(prato.produtoId.toString())?? 1;
                const preco = prato.produtoPreco;
                const subTotal = quantidade * preco;
                total += subTotal;
                return (
                <div className="descPedido" key={prato.produtoId}>
                    {/* alinhado à esquerda */}
                    <div id="descrição">
                        <h1 id="nome">
                            {prato.produtoNome}
                        </h1>
                        <p id="desc">
                            {prato.produtoDescricao}
                        </p>
                    </div>
                    {/* alinhado à direita */}
                    <div id="quantidade">
                        {quantidade.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})} 
                        x {preco} =  {subTotal.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}
                    </div>

                </div>
                )

            })
        }
        <div id="info">
            <p>{Cookies.user.enderecos[0].enderecoCep}</p>
        <p>{total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</p>
        </div>
            <button>Confirmar Pedido</button>
        </>
    )
}