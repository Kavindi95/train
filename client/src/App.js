import React from 'react';
import './App.css';
import Traindetails from './components/traindetails/traindetails';
//import Booktickets from './components/booktickets/booktickets';
import  train1 from './train1.jpg';

function App() {
  return (
    <div className="App">
      <div className="wrapperNew">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Train Sri Lanka</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="#">About</a>
      </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" />
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
      <img src={train1} alt="train1" />;
      </div>
      </nav>
        <Traindetails />
      </div>
    </div>
  );
}

export default App;
