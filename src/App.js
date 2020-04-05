import React, {Component} from 'react';
import './App.css';
import LoginPage from "./containers/LoginPage/LoginPage";
import Picture from "./containers/Picture/Picture";
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/picture" exact component={Picture} />
          <Route path="/" component={LoginPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
