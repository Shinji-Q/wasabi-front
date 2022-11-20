import WasabiDBApi, {venda, cliente,prato,vendaHasProduto} from "../wasabiDB";

export class Cookies {
  static sacola:Map<String, number> = Cookies.loadSacola() ?? new Map<String, number>();
  static user:cliente;

  static initTeste(){
    WasabiDBApi.getCliente(1).then((u) => {
      Cookies.user = u;
      console.log(u);
    }).catch(() => {
      console.log("falha ao buscar usuário");
    })
  }

  

  static loadSacola(){

    var objSacola:Object = (JSON.parse(localStorage.getItem('sacola')?? '{}'));
    if(objSacola == null){
      return null;
    }
    var arraySacola:[String, number][] = Object.entries(objSacola);
    var sacolaCookie:Map<String,number> = new Map(arraySacola);
    return sacolaCookie;

  }


}