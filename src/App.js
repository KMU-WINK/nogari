import React from 'react';
import { Route } from 'react-router-dom';
import { LiarGameView, MainView, RouletteGameView, WordGameView } from './views';
import MainNavigator from "./components/common/MainNavigator";
import AlcoholMarble from "./views/AlcoholMarble";
import Choose_Char from "./Choose_Char/Choose_Char";

function App() {
  return (
      <div>
          <div>
              <Route exact path="/" component={MainView}/>
              <Route path="/liar" component={LiarGameView}/>
              <Route path="/roulette" component={RouletteGameView}/>
              <Route path="/word" component={WordGameView}/>
              <Route path="/marble" component={AlcoholMarble}/>
              <Route path="/choose_char" component={Choose_Char}/>
          </div>
      </div>
  );
}

export default App;
