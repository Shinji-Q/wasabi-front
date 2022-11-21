import WasabiDBApi, {venda, cliente,prato,vendaHasProduto} from "../wasabiDB";

export class Cookies {
  static sacola:Map<String, number> = Cookies.loadSacola() ?? new Map<String, number>();
  static user:cliente;
  static logado:boolean;

  static initTeste(){
    WasabiDBApi.getCliente(1).then((u) => {
      Cookies.user = u;
      console.log(u);
      localStorage.setItem("user", JSON.stringify(Cookies.user));
    }).catch(() => {
      console.log("falha ao buscar usuário");
    })
  }

  

  static loadSacola():Map<String, number> | null{
    var cookieSacola = localStorage.getItem("sacola") ?? "";

    if(cookieSacola !== "") {
      var objSacola:Object = (JSON.parse(cookieSacola));
      var arraySacola:[String, number][] = Object.entries(objSacola);
      var sacola:Map<String,number> = new Map(arraySacola);
      console.log(sacola);
      return sacola;
    } 
    return null;
  }

  static writeSacola(){
    localStorage.setItem("sacola", JSON.stringify(this.sacola));
  }

  static dropSacola(){
    console.log("SACOLA DELETADA")
    this.sacola = new Map();
    localStorage.setItem("sacola", "{}");

  }

  static loadUser(){
    const cookieUser = localStorage.getItem("user")??"";
    if(cookieUser === "" ) {
      Cookies.logado = false;
      console.log('usuário não autenticado')
    } else {
      Cookies.user = JSON.parse(cookieUser) as cliente;
      console.log('usuário autenticado')
      Cookies.logado = true;
    }

  }

}