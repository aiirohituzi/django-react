import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

/*ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="link1" component={Link1}/>
      <Route path="link2" component={Link2}/>
    </Route>
  </Router>,
  document.getElementById('root')
);*/