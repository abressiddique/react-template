import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import { NotFound } from './pages/404';
import { About } from './pages/about';
import { App } from './pages/app';

import { SimpleClicker } from './components/simpleclicker';

require('babel-polyfill');

// simpler version of the app without react-router and redux. Use it from the index.html file
export function initSimple() {
  ReactDOM.render(<SimpleClicker />, document.getElementById('app'));
}

// complex version of the app with redux and react-router. Use it from the index.html file
export function init() {
  // use readux-simple-router ???
  const history = createHistory({ queryKey: false });
  history.__v2_compatible__ = true; // hack for the 2.0 RC
  ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/about" component={About}/>
      <Route path="*" component={NotFound} />
    </Router>
  ), document.getElementById('app'));
}
