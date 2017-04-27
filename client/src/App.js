import React, {Component} from 'react';
import Navigation from './components/Navigation'

class App extends React.Component {
    render(){
        return (
            <div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

export default App;