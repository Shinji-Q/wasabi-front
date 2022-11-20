import {useLoaderData, useParams} from "react-router-dom";
import { categoria, getPratos, getPratosByCat, prato } from "../../wasabiDB";



var catId:number = 0;

//@ts-ignore
export async function loader( {params} ) {
    const pratos = getPratosByCat(params.categoriaId);
    return pratos;
}

type CatProps ={
    categoria?: categoria;
    pratos?: prato[];
}



export function Categoria(props:CatProps) {

    // é necessário chamar a função useLoaderData pra dar update na página
    const pratosCategoria:prato[] = (useLoaderData() as prato[])
    console.log(pratosCategoria);
    return (
        <div id="cats">
            {pratosCategoria.map(p => {return <p>{p.produtoNome} {p.produtoDescricao}</p>})}

        </div>
    )

}
