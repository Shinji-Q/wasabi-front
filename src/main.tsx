import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Cart} from './pages/Cart';
import {LoginPage} from './pages/LoginPage';
import wasabiLogo from './assets/wasabi-logo.png'

import '../style/main.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
  },
  {
    path : "/cart",
    element :  <Cart />
  },
  {
    path : "/login",
    element: <LoginPage />
  },

])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <section className="topbar" >
      <section className="menu">
      <img src={wasabiLogo} alt="wasabiLogo" id="logoMenu"/>
      <a href={`/`}>inicio</a>
      <a href={`cardapio`}>cardapio</a>
      <a href={`cart`}>sacola</a>
      <a href={`login`}>perfil</a>
      </section>
    </section>

    <RouterProvider router={router}/>
  </React.StrictMode>
)
