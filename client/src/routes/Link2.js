import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            loginId: null,
            loginPw: null,
            postInfo: null,
        }


        this.test = this.test.bind(this);
        this.stateArrayTest = this.stateArrayTest.bind(this);
    }

    stateArrayTest() {
        this.setState({
            list: update(
                this.state.list, 
                {
                    $push: ['1', '2']
                }
            )
        });
    }

    render() {
        const arr = this.state.list;
        
        const arrInstance = (
            <div>
            {arr[0]}<br/>
            {arr[1]}<br/>
            {arr.length}
            </div>
        );

        return(
            <div>
                임시 작업용 페이지

                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
            </div>
        );
    }
};

export default Link2;