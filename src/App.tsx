import { useState } from "react";
import { Card } from "./components/Card";
import { api } from "./shared/services/api";

export function App() {
  //imutabilidade
  const [cards, setCards] = useState<String[]>(["um", "dois"]);

  function addCard(){

    var campo = (window.document.querySelector("input#campo") as HTMLInputElement);

    setCards([...cards, campo.value]) ;

    campo.value = "";

  }

  return (
  <div>
    {
    cards.map(card=>{
      return <Card text={card}/>
      })
    }
    <input type="text" id="campo"/>
    <button onClick={addCard}>Botão</button>
  </div>
  );
}

export default App
