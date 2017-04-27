import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Home from './containers/Home';
import Link1 from './containers/Link1';
import Link2 from './containers/Link2';

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="link1" component={Link1}/>
      <Route path="link2" component={Link2}/>
    </Route>
  </Router>,
  document.getElementById('root')
);