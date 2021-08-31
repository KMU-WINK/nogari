import React from 'react';
import { Route } from 'react-router-dom';
import {
    LiarGameView,
    RouletteGameView,
    WordGameView,
    MainView,
    CreateUserView,
    AlcoholMarbleView,
    CreateRoomView,
    ChangeCharacterView,
    Choose_Char,
    Find,
    NewWaitingRoom, LiarCategoryView,
} from './views';

function App() {
  return (
  <div>
    <div>
        <Route exact path="/" component={MainView}/>
        <Route path="/rooms/:roomId/liar" component={LiarGameView}/>
        <Route path="/roulette" component={RouletteGameView}/>
        <Route path="/rooms/:roomId/word" component={WordGameView}/>
        <Route path="/Find" component={Find}/>
        <Route path="/Choose_Char" component={Choose_Char}/>
        <Route exact path="/rooms/:roomId" component={NewWaitingRoom}/>
        <Route exact path="/rooms/:roomId/liarCategory" component={LiarCategoryView}/>
        <Route path="/rooms/:roomId/marble" component={AlcoholMarbleView}/>
        <Route path="/createUser" component={CreateUserView}/>
        <Route path="/createRoom" component={CreateRoomView}/>
        <Route path="/changeCharacter" component={ChangeCharacterView}/>
      </div>
    </div>
  );
}

export default App;
