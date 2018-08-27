import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//react nav stuff
import { BrowserRouter, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />, document.getElementById('root')
);
registerServiceWorker();
