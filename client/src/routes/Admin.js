import React from 'react';
import * as service from '../services/login';

import { Button, Form, FormGroup, Grid, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: false,
            loginId: null
        };

        this.login = this.login.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (sessionStorage.getItem('loginStatus') != null){
            var loginStatus = sessionStorage.getItem('loginStatus');
        }
        
        this.setState({
            loginStatus,
            loginId
        })
    }
    
    login() {
        var temp = service.getAuth()
        if(temp){
            sessionStorage.setItem('loginStatus', true);
        }
        console.log(temp)
        // var temp = sessionStorage.getItem('loginStatus');
        // console.log(temp);
    }

    logout() {
        sessionStorage.removeItem('loginStatus');
    }
    
    render() {
        const loginStatus = this.state.loginStatus;
        const adminInstance = [];

        if(loginStatus) {
            adminInstance.push(
                <div>
                    login
                    <Button onClick={this.logout}>Sing out</Button>
                </div>
            );
        }else {
            adminInstance.push(
                <Form horizontal>
                    <FormGroup controlId="formId">
                        <Col componentClass={ControlLabel} sm={2}>
                            ID
                        </Col>
                        <Col sm={10}>
                            <FormControl type="id" placeholder="ID" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.login}>
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }

        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            {adminInstance}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Admin;