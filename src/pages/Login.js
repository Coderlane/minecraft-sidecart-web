import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  async googleSignIn() {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { error } = this.state;

    return (
      <div className="container">
        <h1>
          Login to
          <Link className="title ml-2" to="/">
            Sidecart
          </Link>
        </h1>
        <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
          Sign in with Google
        </button>
        { error ? (<p className="text-danger">{ error }</p>) : null }
      </div>
    );
  }
}
