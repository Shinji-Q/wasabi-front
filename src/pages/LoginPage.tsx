import "../../style/LoginPage.css"
import wasabiLogo from "../assets/wasabi-logo.png"
import sushiBackground from "../assets/sushi_background.jpg"
import { Cookies } from "../hooks/Cookies"

export function LoginPage(){
    return (
        <div id="loginScreen">
            <img src={sushiBackground} alt="sushiBackground" id="BGLogin"/>
            <div id="loginPanel">
                <img src={wasabiLogo} alt="wasabiLogo" id="logoLogin"/>
                <div id="formContainer">

                    <form id="loginForm">
                        <label> Email: </label>
                        <input type="text" name="email" id="inEmail"/>

                        <label> Senha: </label>
                        <input type="password" name="password" id="inPwd"/>
                        <a href={`newaccount`}>criar conta</a>
                    </form>

                </div>
            </div>
        </div>
    )
}