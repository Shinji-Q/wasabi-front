import React, { useEffect } from "react";
import { Link, Outlet, useLoaderData} from "react-router-dom";
import WasabiDBApi ,{ categoria, prato} from "../wasabiDB";
import { Categoria } from "./Cardapio/Categoria";
import "../../style/Cardapio.css"
import { api } from "../shared/services/api";



export async function loader():Promise<categoria[]> {
    const categorias = await WasabiDBApi.getCategorias();
    return categorias;
}

export function Cardapio(){
    const categorias:categoria[] = (useLoaderData() as categoria[]);
        return (
            <div id ="Cardapio">
                <div id="menuCategorias">
                    {
                    categorias.map((cat:categoria, index:Number) => {
                        let tipo = index === 0 ? `primeiro` 
                            : index === (categorias.length - 1) ? `ultimo` 
                            : index.toString();
                        return (
                            <Link 
                                to={cat.categoriaId.toString()} 
                                className="categoria"
                                //@ts-ignore
                                key={index}
                                id = {tipo}
                            >
                                <p className="nomeCat">{cat.categoriaNome}</p>
                            </Link>
                        );
                    })
                    }
                </div>
                <div id="listaPratos">
                    <Outlet />
                </div>
            </div>
        );

}


type CatProps = {
    categoria?: categoria;
    categoria_id?: Number;
}
