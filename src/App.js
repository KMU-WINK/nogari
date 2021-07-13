import React from 'react';
import { Route } from 'react-router-dom';
import { LiarGameView, MainView, RouletteGameView, WordGameView } from './views';
import MainNavigator from "./components/common/MainNavigator";

function App() {
  return (
    <div>
      {/*<div>*/}
      {/*  <MainNavigator />*/}
      {/*</div>*/}
      <div>
        <Route exact path="/" component={MainView}/>
        <Route path="/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/word" component={WordGameView}/>
      </div>
    </div>
  );
}

export default App;
