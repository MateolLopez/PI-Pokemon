import './App.css';
import React from 'react'; 

// Para poder establecer rutas (ya tengo el browser router en index)
import { Route, Switch } from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage.js';
import Home from './components/Home/Home.js';
import PokeDetail from './components/PokeDetail/PokeDetail.js';
import PokeCreate from './components/PokeCreate/PokeCreate.js';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path="/pokeDetail/:id" component={PokeDetail} />
        <Route path="/create" component={PokeCreate} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
