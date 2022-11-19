import React, { useEffect } from "react";
import { Link, Outlet, useLoaderData} from "react-router-dom";
import { getCategorias, categoria, prato, getPratos} from "../wasabiDB";
import { Categoria } from "./Cardapio/Categoria";
import "../../style/Cardapio.css"
import { api } from "../shared/services/api";


export async function loader():Promise<categoria[]> {
    const categorias = await getCategorias();
    const pratos = await getPratos();
    return categorias;
}

export function Cardapio(){
    const categorias:categoria[] = (useLoaderData() as categoria[]);
    // useEffect(() => {
    //     api.get("produto/1").then(response => {
    //         console.log(response);
    //     })
    // },[]);
        return (
            <>
                <div id="menuCategorias">
                    <div className="centralizarVertical">
                        {
                        categorias.map((cat:categoria, index:Number) => {
                            let tipo = 
                                    index === 0 ? `primeiro` :
                                    index === (categorias.length - 1) ? `ultimo` :
                                    index.toString();
                            return (
                                <Link 
                                to={cat.categoriaId.toString()} 
                                className="categoria"
                                //@ts-ignore
                                key={index}
                                id = {tipo}>
                                    {cat.categoriaNome}</Link>
                            );
                        })
                        }
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </>
        );

}


type CatProps = {
    categoria?: categoria;
    categoria_id?: Number;
}
