import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Cart, loader as cartLoader} from "./pages/Cart";
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
import { FormularioClientePage } from "./pages/FormularioClientePage";



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
        element :  <Cart />,
        loader: cartLoader,
      },
      {
        path : "/login",
        element: <LoginPage />
      },
      {
        path : "/signup",
        element: <FormularioClientePage />
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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
