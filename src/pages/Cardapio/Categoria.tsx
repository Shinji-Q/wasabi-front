import {useLoaderData, useParams} from "react-router-dom";
import { 
    categoria,
     getPratos,
     prato ,
     getPratosByCategoria
    } from "../../wasabiDB";



var categoriaId:number;

//@ts-ignore
export async function loader( {param} ) {
    console.log(param.categoriaId);

    const pratos = getPratosByCategoria(param.categoriaID)
    
    return pratos;
}

type CatProps ={
    categoria?: categoria;
    pratos?: prato[];
}



export function Categoria(props:CatProps) {
    const pratosCategoria:prato[] = (useLoaderData() as prato[]);
    console.log("estive aqui");
    return (

        <>
            {
                `testando`
            }
        </>
    )


}
