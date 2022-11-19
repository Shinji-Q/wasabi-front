import {useLoaderData} from "react-router-dom";
import { categoria, prato } from "../../wasabiDB";

type paramsCat = {
    categoriaId: number;
}
export async function loader( params: paramsCat) {

    return getProdutosByCategoria(params.categoriaId)

}

type CatProps ={
    categoria: categoria;
    pratos?: prato[];
}

export function Categoria(props:CatProps) {

    return (
        <h1> {props.categoria.categoria_nome ?? `Erro, categoria nula`} </h1>
    )

}
