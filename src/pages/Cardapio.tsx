import React from "react";
import { Link, Outlet, useLoaderData} from "react-router-dom";
import { getCategorias, categoria, prato, getPratos} from "../wasabiDB";
import { Categoria } from "./Cardapio/Categoria";
import "../../style/Cardapio.css"


export async function loader():Promise<categoria[]> {
    const categorias = await getCategorias();
    const pratos = await getPratos();
    return categorias;
}

export function Cardapio(){
    const categorias:categoria[] = (useLoaderData() as categoria[]);
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
                            console.log(tipo);
                            return (
                                <Link 
                                to={cat.categoria_id.toString()} 
                                className="categoria"
                                key={index}
                                id = {tipo}>
                                    {cat.categoria_nome}</Link>
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
