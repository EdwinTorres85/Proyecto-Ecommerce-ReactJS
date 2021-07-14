import React from "react";
import './App.css';
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider defaultValue={[]}>
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Route exact path={['/', '/categories/:categoryId']}>
            <ItemListContainer title="Productos" />
          </Route>
          <Route exact path='/detail/:id'>
            <ItemDetailContainer />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>

        </Switch>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
