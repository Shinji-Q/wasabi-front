import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Route,
  Switch
} from "react-router-dom";

import { Cart } from './pages/Cart';
import { LoginPage } from './pages/LoginPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export function AppRoutes(){
    return (
        <Router>
            <Switch>
                <Route path="cart" element={<Cart />}/>
                <Route path="/login" element={<LoginPage />}/>
            </Switch>
        </Router>
    )
}