
export type categoria = {
    categoria_id: number;
    categoria_nome: String;
    categoria_descricao: String;
}

export type prato = { 
    produto_id: number;
    produto_nome : String;
    produto_descricao: String;
    produto_preco: number;
    produto_categoria: number;
}

const categorias = [
       {"categoria_id": 0, "categoria_nome" : "cat0", "categoria_descricao": "cat00"},
       {"categoria_id": 1, "categoria_nome" : "cat1", "categoria_descricao": "cat10"},
       {"categoria_id": 2, "categoria_nome" : "cat2", "categoria_descricao": "cat20"},
       {"categoria_id": 3, "categoria_nome" : "cat3", "categoria_descricao": "cat30"}
];

const pratos = [
    {"produto_id": 0, "produto_nome" : "Nome0", "produto_descricao": "Descricao0", "produto_preco": 0.00, "produto_categoria": 0},
    {"produto_id": 1, "produto_nome" : "Nome1", "produto_descricao": "Descricao1", "produto_preco": 1.00, "produto_categoria": 0},
    {"produto_id": 2, "produto_nome" : "Nome2", "produto_descricao": "Descricao2", "produto_preco": 2.00, "produto_categoria": 1},
    {"produto_id": 3, "produto_nome" : "Nome3", "produto_descricao": "Descricao3", "produto_preco": 3.00, "produto_categoria": 1},
    {"produto_id": 4, "produto_nome" : "Nome4", "produto_descricao": "Descricao4", "produto_preco": 4.00, "produto_categoria": 2},
    {"produto_id": 5, "produto_nome" : "Nome5", "produto_descricao": "Descricao5", "produto_preco": 5.00, "produto_categoria": 2},
    {"produto_id": 6, "produto_nome" : "Nome6", "produto_descricao": "Descricao6", "produto_preco": 6.00, "produto_categoria": 3},
    {"produto_id": 7, "produto_nome" : "Nome7", "produto_descricao": "Descricao7", "produto_preco": 7.00, "produto_categoria": 3},
];

export async function getCategorias():Promise<categoria[]> {
    return categorias;
}


export async function getPratos():Promise<prato[]> {
    return pratos;
}