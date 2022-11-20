import { useEffect } from "react";
import { api } from "../shared/services/api";
import WasabiDBApi from "../wasabiDB";


export function TestePage(){
    
    WasabiDBApi.getCategoria(1).then(prato => {
        console.log(prato);
    })
    return (
        <>
        <p>aaaa</p>
            
        </>
    )
}
