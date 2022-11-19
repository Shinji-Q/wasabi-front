import { useEffect } from "react";
import { api } from "../shared/services/api";
import { getCategoria, getEnderecos, getPrato, getPratos } from "../wasabiDB";


export function TestePage(){
    
    getCategoria(1).then(prato => {
        console.log(prato);
    })
    return (
        <>
        <p>aaaa</p>
            
        </>
    )
}
