import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom'
import Speakersgram from './Components/Speakersgram/Speakersgram';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path = "/" component = {Speakersgram} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;