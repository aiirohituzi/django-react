import React from 'react';
import axios from 'axios';

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class UploadPost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={8} md={8}>
                        <FormGroup controlId="formControlsTitle">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Enter title" />
                        </FormGroup>
                        <FormGroup controlId="formControlsContent">
                            <ControlLabel>Content</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Content" style={{ height: 200 }} />
                        </FormGroup>
                        <Button bsClass="btn btn-primary pull-right">Upload</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default UploadPost;