import React from 'react';
import Header from '../components/Header';

function HomePage() {
  return (
    <div className="home">
      <Header />
      <section>
        <div className="jumbotron jumbotron-fluid py-5">
          <div className="container text-center py-5">
            <h1 className="display-4">Welcome to Sidecart</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
