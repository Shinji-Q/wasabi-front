import {useLoaderData} from "react-router-dom";
import { categoria, prato } from "../../wasabiDB";

type paramsCat = {
    categoriaId: number;
}


async function getProdutosByCategoria(idCategoria:number){

    return idCategoria;

}

//@ts-ignore
export async function loader( {params} ) {

    console.log(params.categoriaId)
    const pratosByCategoria = getProdutosByCategoria(params.categoriaId);

    return pratosByCategoria;

}

type CatProps ={
    categoria?: categoria;
    pratos?: prato[];
}

export function Categoria(props:CatProps) {
    const produtosCat:Promise<number> = useLoaderData() as Promise<number>;
    return (
        <> {props.categoria?.categoria_nome ?? produtosCat} </>
    )

}
