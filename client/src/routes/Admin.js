import React from 'react';

import { Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: false,
            loginId: null
        };
    }

    componentWillReceiveProps (nextProps) {
        
        const { loginStatus, loginId } = nextProps;
        
        this.setState({
            loginStatus,
            loginId
        })
    }
    
    render() {
        const loginStatus = this.state.loginStatus;
        const adminInstance = [];

        if(loginStatus) {
            adminInstance.push(
                <div>
                    login
                </div>
            );
        }else {
            adminInstance.push(
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            ID
                        </Col>
                        <Col sm={10}>
                            <FormControl type="id" placeholder="ID" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }

        return (
            <div>
                {adminInstance}
            </div>
        );
    }
}

export default Admin;