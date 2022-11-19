import React from "react";
import { Outlet, useLoaderData} from "react-router-dom";
import { getCategorias, categoria, prato} from "../wasabiDB";
import { Categoria } from "./Cardapio/Categoria";


export async function loader():Promise<categoria[]> {
    const categorias = await getCategorias();
    return categorias;
}

export function Cardapio(){
    const categorias:categoria[] = (useLoaderData() as categoria[]);
        return (
            <div>

                {
                categorias.map((cat:categoria, index:Number) => {
                    return (<div><Categoria categoria={cat}/><p>{index.toString()}</p></div>);
                })
                }
                <div>
                    <Outlet />
                </div>

            </div>
        );

}


type CatProps = {
    categoria?: categoria;
    categoria_id?: Number;
}
