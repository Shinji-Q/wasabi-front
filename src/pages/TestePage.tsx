import { useEffect } from "react";
import { api } from "../shared/services/api";
import { getPratos } from "../wasabiDB";


export function TestePage(){
    getPratos().then(prato => {
        console.log(prato.pop());
    })

    useEffect(() => {
        api.get("produto/1").then(response => {
            console.log(response);
        })
    },[]);
    return (
        <>
        <p>aaaa</p>
            
        </>
    )
}
