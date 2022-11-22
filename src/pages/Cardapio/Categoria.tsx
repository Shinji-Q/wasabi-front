import {useLoaderData, useParams} from "react-router-dom";
import WasabiDBApi, { categoria, prato } from "../../wasabiDB";
import { PratoCard } from "./PratoCard";



var catId:number = 0;

//@ts-ignore
export async function loader( {params} ) {
    const pratos = WasabiDBApi.getPratosByCat(params.categoriaId);
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

            {pratosCategoria.map(( p, index )=> {return <div className="card" id={`card${index}`}><PratoCard key={index}  prato={p}/></div>})}

        </div>
    )

}
