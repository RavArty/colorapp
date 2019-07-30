import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main.js'
import './App.css';
import HistoryCards from './components/HistoryCards/HistoryCards.js';



const App = () => {
 
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/history' component={HistoryCards} />
      </Switch>
    </div>
  );
}


export default App;
