import "../../style/LoginPage.css"
import wasabiLogo from "../assets/wasabi-logo.png"
import sushiBackground from "../assets/sushi_background.jpg"
import { Cookies } from "../hooks/Cookies"
import WasabiDBApi, { usuario } from "../wasabiDB"


export function LoginPage(){

    function login() {
        const email:string = (document.getElementById("inEmail") as HTMLInputElement).value;
        const passwd:string = (document.getElementById("inPwd") as HTMLInputElement).value;
        console.log(email + " " + passwd);

        const usr = WasabiDBApi.getUsuarioAutenticado(email,passwd);
        
        usr.then((u)=>{


            localStorage.setItem("user", JSON.stringify(u.cliente));
            window.location.assign("/cardapio/1")
        }
        ).catch((e) =>{
            window.alert("usuário ou senha incorretos");

        });

    }
    return (
        <div id="loginScreen">
            <img src={sushiBackground} alt="sushiBackground" id="BGLogin"/>
            <div id="loginPanel">
                <img src={wasabiLogo} alt="wasabiLogo" id="logoLogin"/>
                <div id="formContainer">

                    <form id="loginForm" onSubmit={(ev) => {
                        ev.preventDefault();
                        login();

                    }}>

                        <label> Email: </label>
                        <input type="text" name="username" id="inEmail"/>

                        <label> Senha: </label>
                        <input type="password" name="password" id="inPwd"/>
                        <button type="submit" id="bntlogin">login</button>
                        <button onClick={(ev) => window.location.assign("/signup")} id="bntCriarConta">criar conta</button>
                    </form>

                </div>
            </div>
        </div>
    )
}