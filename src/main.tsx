import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Cart } from "./pages/Cart";
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import { Cardapio, loader as cardapioLoader } from "./pages/Cardapio";
import { Categoria, loader as categoriaLoader } from "./pages/Cardapio/Categoria";
import { ErrorPage } from "./pages/ErrorPage";
import wasabiLogo from "./assets/wasabi-logo.png"
import "../style/main.css"
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { prato } from "./wasabiDB";
import { TestePage } from './pages/TestePage';


const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        //path : "/home",
        element: <Home />
      },
      {
        path : "/cart",
        element :  <Cart />
      },
      {
        path : "/login",
        element: <LoginPage />
      },
      {
        path : "/teste",
        element: <TestePage />
      },
      {
        path: "/cardapio",
        element: <Cardapio />,
        loader: cardapioLoader,
        children: [{
          path: "/cardapio/:categoriaId",
          element: <Categoria />,
          loader: categoriaLoader,
        }]
      },
    ]
  },
])


// sacola:Map<ProdutoId, quantidade>
let sacola:Map<String, number>;


var objSacola = (JSON.parse(localStorage.getItem('sacola')??'{}'));
var arraySacola = Object.entries(objSacola);

// @ts-ignore
var sacolaCookie:Map<String,number> = new Map(arraySacola);
console.log(sacolaCookie);

sacola = sacolaCookie;

export function addToSacola(produtoId:number)/*:React.MouseEventHandler<HTMLBRElement>*/{
  var quantidade:number;

  quantidade = (sacola.get(produtoId.toString()) ?? 0) + 1;
  sacola.set(produtoId.toString(), quantidade);
  //salvando a sacola localmente com cookies
  localStorage.setItem('sacola', JSON.stringify(Object.fromEntries(sacola)))

}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
