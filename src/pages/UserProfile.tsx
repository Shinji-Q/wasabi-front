import { redirect, Navigate, Link } from "react-router-dom";
import { Cookies } from "../hooks/Cookies"

import "../../style/UserProfile.css"

export function UserProfile() {

    const user = Cookies.user;

    function logout() {
        localStorage.removeItem("user");
        
        window.location.assign("/cardapio/1");
    }

    return (
        <>
            {/* mostrar informações do usuário */}

            <div id="holder">
                <Link to="/" onClick={()=>logout()}>logout</Link>

            </div>

        
        </>
    )
}