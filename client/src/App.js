import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation'
import Home from './routes/Home';
import Link1 from './routes/Link1';
import Link2 from './routes/Link2';

class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Navigation />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/Link1" component={Link1}/>
                            <Route path="/Link2" component={Link2}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;