import React from 'react';
import axios from 'axios';

import AdminMenu from '../components/Admin/AdminMenu';

import { Button, Form, FormGroup, Grid, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: sessionStorage.getItem('loginStatus'),
            loginId: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("shouldComponentUpdate: " + JSON.stringify(nextProps)) + " " + JSON. stringify(nextState);
        if (this.state.loginStatus !== nextState.loginStatus) {
            return true;
        }
        return false;
    }
    
    login = async () => {
        var inputId = document.getElementById('formId').value
        var inputPw = document.getElementById('formPassword').value

        var isLogin = false;
        await axios.post('http://127.0.0.1:8000/login/', {
            user: inputId,
            password: inputPw
        })
        .then(function (response) {
            // console.log(response.data);
            if(response.data == 'True'){
                isLogin = true;
            }
        })
        .catch(function (error) {
            // console.log(error);
            isLogin = false;
        });

        // console.log(isLogin)
        if(isLogin){
            sessionStorage.setItem('loginStatus', true);
            this.setState({
                loginStatus: true
            });
        }
    }

    logout() {
        sessionStorage.removeItem('loginStatus');
        this.setState({
            loginStatus: false
        });
    }
    
    render() {
        const loginStatus = this.state.loginStatus;
        const loginInstance = [];

        if(loginStatus) {
            loginInstance.push(
                <div key='afterLogin'>
                    <Button onClick={this.logout}>Sing out</Button>
                    <AdminMenu/>
                </div>
            );
        }else {
            loginInstance.push(
                <Form horizontal key='beforeLogin'>
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
                            {loginInstance}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Admin;