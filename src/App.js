import React, {Component} from 'react';
import './App.css';
import LoginPage from "./containers/LoginPage/LoginPage";
import Picture from "./containers/Picture/Picture";
import LandingPage from  "./containers/LandingPage/LandingPage";
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render(){
    return (
        <div className="App">
          <Switch>
            <Route path="/picture" component={Picture} />
            <Route path="/" component={LandingPage} />
            {/* {this.props.loggedIn ? <Route path="/" component={LandingPage} /> : <Route path="/" component={LoginPage}/>} */}
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);
