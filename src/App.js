import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import ProjectSkywritingDemo from './ProjectSkywritingDemo';
//react nav stuff
import { BrowserRouter, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import Speakersgram from './Components/Speakersgram/Speakersgram';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
<!--          <Route exact path = "/" component = {ProjectSkywritingDemo} />-->
          <Route exact path = "/" component = {Speakersgram} />
        </div>
      </BrowserRouter>




    );
  }
}

export default App;
/*
<div className="App">
  <ProjectSkywritingDemo urlParams={this.props.match.params} urlQueryString={this.props.location.search} />
</div>
*/
