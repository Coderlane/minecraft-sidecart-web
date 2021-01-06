import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Servers from './pages/Servers';
import Login from './pages/Login';
import { auth } from './services/firebase';
import { PublicRoute, PrivateRoute } from './components/Routes';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    const { loading, authenticated } = this.state;
    return loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/servers"
            redirect="/login"
            authenticated={authenticated}
            component={Servers}
          />
          <PublicRoute
            path="/login"
            redirect="/servers"
            authenticated={authenticated}
            component={Login}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
