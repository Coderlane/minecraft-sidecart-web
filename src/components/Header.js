import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">Sidecart</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? (
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/servers">Servers</Link>
                <button className="btn btn-primary" type="button" onClick={() => auth().signOut()}>Logout</button>
              </div>
            )
            : (
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/login">Sign In</Link>
              </div>
            )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
