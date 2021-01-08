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
import { UserProvider } from './components/UserContext';
import { PublicRoute, PrivateRoute } from './components/Routes';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.setState({
        user,
        loading: false,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <UserProvider value={{ user, loading }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/servers"
              redirect="/login"
              component={Servers}
            />
            <PublicRoute
              path="/login"
              redirect="/servers"
              component={Login}
            />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
