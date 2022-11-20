import WasabiDBApi, { venda, vendaHasProduto } from "../wasabiDB";
import { Cookies } from "./Cookies";

export function addToSacola(produtoId:number)/*:React.MouseEventHandler<HTMLBRElement>*/{

    var quantidade:number = (Cookies.sacola.get(produtoId.toString()) ?? 0) + 1;

    setProdQuant(produtoId, quantidade);

    //salvando a sacola localmente com cookies
    localStorage.setItem('sacola', JSON.stringify(Object.fromEntries(Cookies.sacola)))
}


export function removeOneFromSacola(produtoId:number){

    var quantidade:number = (Cookies.sacola.get(produtoId.toString()) ?? 0) - 1;

    setProdQuant(produtoId, quantidade);
    //salvando a sacola localmente com cookies
    localStorage.setItem('sacola', JSON.stringify(Object.fromEntries(Cookies.sacola)))
    
}
export function removeFromSacola(produtoId:number){
    setProdQuant(produtoId, 0);
}

export function setProdQuant(produtoId:number, quantidade: number){

    if(quantidade > 0)
    Cookies.sacola.set(produtoId.toString(), quantidade);

}

export function fecharPedido(){
    var pedidos:vendaHasProduto[] = [];
    var index:number = 0;

    /*
    esta função busca os produtos, seleciona os que estão no carrinho
    em seguida junta as informações do pedido com as do usuário, calcula
    o valor e insere a data para fazer uma requisição e adicionar o pedido
    ao banco de dados
    */
    WasabiDBApi.getPratos()
    .then((pratos)=>{

        pratos = pratos.filter( p => {
        return Cookies.sacola.has(p.produtoId.toString());})

        var total:number = 0;
        var pedidos:vendaHasProduto[]= pratos.map((prato, index )=>{

        var quantidade = Cookies.sacola.get(prato.produtoId.toString())?? 0;
        total += prato.produtoPreco*quantidade;
        const vendaAux:vendaHasProduto =
            {
            id:{vendaId: -1,
            produtoId:prato.produtoId},
            produto:prato,
            quantidade:quantidade,
            }
        return(vendaAux);
        })

        //juntando informações de usuário e data
        const vendafechada:venda = {
            vendaId: -1,
            cliente: Cookies.user,
            vendaTotal: total,
            //@ts-ignore
            vendaData: Date.now(),
            vendaHasProdutos: pedidos
        }
        console.log('venda');
        console.log(vendafechada);
        

        const vendaconcluida = WasabiDBApi.postVenda(vendafechada).then( () => {

            console.log('tentando');

        }
        ).catch((e) => {

            console.log('algo deu erado ein');
            console.log(e);
        }
        )

        return vendaconcluida;
    })

}

