import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Cart } from './pages/Cart';
import { LoginPage } from './pages/LoginPage';
import { Home } from './pages/Home';
import { ErrorPage } from "./pages/ErrorPage";
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
    ]
  },

])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
