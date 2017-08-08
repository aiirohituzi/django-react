import React from 'react';
import axios from 'axios';

import AdminMenu from '../components/Admin/AdminMenu';

import { Button, Form, FormGroup, Grid, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: sessionStorage.getItem('loginStatus'),
            loginId: null,
            loginPw: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("shouldComponentUpdate: " + JSON.stringify(nextProps)) + " " + JSON. stringify(nextState);
        if (this.state.loginStatus !== nextState.loginStatus) {
            return true;
        }
        return false;
    }
    
    login = async () => {
        var data = new FormData();

        var inputId = document.getElementById('formId').value
        var inputPw = document.getElementById('formPassword').value

        const config = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        data.append('username', inputId);
        data.append('password', inputPw);

        var isLogin = false;
        await axios.post('http://127.0.0.1:8000/login/', data, config)
        .then(function (response) {
            // console.log(response.data);
            if(response.data == 'True'){
                isLogin = true;
            }
        })
        .catch(function (error) {
            console.log(error);
            isLogin = false;
        });

        // console.log(isLogin)
        if(isLogin){
            sessionStorage.setItem('loginStatus', true);
            sessionStorage.setItem('loginId', inputId);
            sessionStorage.setItem('loginPw', inputPw);
            this.setState({
                loginStatus: true,
                loginId: inputId,
                loginPw: inputPw
            });
        } else {
            alert('로그인에 실패하였습니다. ID와 PW를 다시 확인해주세요.')
        }
    }

    logout() {
        sessionStorage.removeItem('loginStatus');
        this.setState({
            loginStatus: false
        });
    }

    handleKeyPress(e) {
        if(e.charCode===13) {
            this.login();
        }
    }
    
    render() {
        const loginStatus = this.state.loginStatus;
        const loginInstance = [];

        if(loginStatus) {
            loginInstance.push(
                <div key='afterLogin'>
                    <Grid>
                    <Row>
                        <Col xs={8}>
                            <h3>관리자 페이지</h3>
                        </Col>
                        <Col xs={4}>
                            <Button bsClass="btn btn-default pull-right" onClick={this.logout}>Sign out</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <AdminMenu/>
                    </Row>
                    </Grid>
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
                            <FormControl type="password" placeholder="Password" onKeyPress={this.handleKeyPress}/>
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