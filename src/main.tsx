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
import { getPratos, prato } from "./wasabiDB";
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

export const pratos:Promise<prato[]> = getPratos();

pratos.then(
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
