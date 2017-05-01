import React from 'react';

import { Jumbotron, Button, Grid } from 'react-bootstrap';

class Home extends React.Component {
    
    render() {
        const jumbotronInstance = (
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <p><Button bsStyle="primary">Learn more</Button></p>
            </Jumbotron>
        );

        return (
            <div>
                <Grid>
                {jumbotronInstance}
                </Grid>
            </div>
        );
    }
}

export default Home;