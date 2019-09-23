import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation'
import Home from './routes/Home';
import PostContainer from './routes/PostContainer';
import Link2 from './routes/Link2';
import Admin from './routes/Admin';
import HooksTest from './routes/HooksTest';

class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Navigation />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/Post" component={PostContainer}/>
                            <Route path="/Link2" component={Link2}/>
                            <Route path="/Admin" component={Admin}/>
                            <Route path="/HooksTest" component={HooksTest}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;