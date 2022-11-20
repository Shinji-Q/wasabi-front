import { useEffect } from "react";
import { api } from "./shared/services/api";

export type categoria = {
    categoriaId: number;
    categoriaNome: String;
    categoriaDescricao: String;
}

export type prato = { 
    produtoId: number;
    produtoNome : String;
    produtoDescricao: String;
    produtoPreco: number;
    categoria: categoria;
}



export type endereco = {
    id: {
      enderecoId: number,
      enderecoCliente: number
    },
    enderecoRua: String,
    enderecoBairro: String,
    enderecoCidade: String,
    enderecoEstado: String,
    enderecoPais: String,
    enderecoCep: String
}

export type cartao = {
    id: {
      cartaoId: number,
      cartaoCliente: number
    },
    cartaoNumero: String
}

export type cliente = {
    clienteId: number,
    clienteNome: String,
    clienteSobrenome: String,
    clienteCpf: String,
    clienteTelefone: String,
    cartaos: cartao[],
    enderecos: endereco[]
}

export type vendaHasProduto = {
    id: {
      vendaId: number,
      produtoId: number
    },
    produto: prato,
    quantidade: number
}

export type venda = {
    vendaId: number,
    cliente: cliente,
    vendaTotal: number,
    vendaData: Date,
    vendaHasProdutos: vendaHasProduto[]
}

export type usuario = {
    usuarioId: number,
    cliente: cliente,
    usuarioEmail: String,
    usuarioSenha: String,
    usuarioTipo: String
}

export default class WasabiDBApi{
    constructor () {

    }
    static async getCategorias():Promise<categoria[]> {
        const resp = (await api.get<categoria[]>("/categoria")).data
        return resp;
    }

    static async getCategoria(categoriaId:number):Promise<categoria> {
        const resp = (await api.get<categoria>("/categoria/"+categoriaId)).data;
        return resp;
    }

    static async getPratos():Promise<prato[]> {
        const resp = (await api.get<prato[]>("/produto")).data
        return resp;
    }

    static async getPrato(produtoId:number):Promise<prato> {
        const resp = (await api.get<prato>("/produto/"+produtoId)).data
        return resp;
    }

    static async getPratosByCat(categoriaId:number):Promise<prato[]> {
        const resp = (await api.get<prato[]>(`produto/cat/${categoriaId}`)).data
        return resp;
    }
    
    tentando(){

    }

    static async getEnderecos():Promise<endereco[]> {
        const resp = (await api.get<endereco[]>("/endereco/")).data
        return resp;
    }

    static async getEndereco(enderecoId:number):Promise<endereco> {
        const resp = (await api.get<endereco>("/endereco/"+enderecoId)).data
        return resp;
    }

    static async getCartoes():Promise<cartao[]> {
        const resp = (await api.get<cartao[]>("/cartao/")).data
        return resp;
    }

    static async getCartao(cartaoId:number, cartaoCliente:number):Promise<cartao> {
        const resp = (await api.get<cartao>("/cartao/?cartaoId="+ cartaoId +"&cartaoCliente="+ cartaoCliente)).data
        return resp;
    }

    static async getClientes():Promise<cliente[]> {
        const resp = (await api.get<cliente[]>("/cliente/")).data
        return resp;
    }

    static async getCliente(clienteId:number):Promise<cliente> {
        const resp = (await api.get<cliente>("/cliente/"+clienteId)).data
        return resp;
    }


    static async getVendas():Promise<venda[]> {
        const resp = (await api.get<venda[]>("/venda/")).data
        return resp;
    }

    static async getVenda(vendaId:number):Promise<venda> {
        const resp = (await api.get<venda>("/venda/"+vendaId)).data
        return resp;
    }

    static async getUsuarios():Promise<usuario[]> {
        const resp = (await api.get<usuario[]>("/usuario/")).data
        return resp;
    }

    static async getUsuario(usuarioId:number):Promise<usuario> {
        const resp = (await api.get<usuario>("/usuario/"+usuarioId)).data
        return resp;
    }
} 
