import { redirect, Navigate, Link } from "react-router-dom";
import { Cookies } from "../hooks/Cookies"


export function UserProfile() {

    const user = Cookies.user;

    function logout() {
        localStorage.removeItem("user");
        
        <Navigate to="/" />
    }

    return (
        <>
            {/* mostrar informações do usuário */}

            <Link to="/" onClick={()=>logout()}>logout</Link>
        
        </>
    )
}