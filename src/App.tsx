import { useState } from "react";
import { Card } from "./components/Card";
import { api } from "./shared/services/api";
import wasabiLogo from "./assets/wasabi-logo.png";
import '../style/App.css';
import {AppRoutes} from "./routes";


export function App() {
  //imutabilidade
  const [cards, setCards] = useState<String[]>(["um", "dois"]);

  function addCard(){

    var campo = (window.document.querySelector("input#campo") as HTMLInputElement);

    setCards([...cards, campo.value]) ;

    campo.value = "";

  }

  return (
  <view>
    <section id="mainApp" >
      <section></section>
      <h1>testetesteTESTE</h1>
      <img src={wasabiLogo} alt="wasabiLogo" id="wasabiLogo"/>
      {

        cards.map(card=>{
          return <Card text={card} key={card}/>
        })
      }
      <input type="text" id="campo"/>
      <button onClick={addCard}>Botão</button>

    </section>
  </view>
  );

}

export default App
