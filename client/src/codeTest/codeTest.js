// import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import React from 'react';

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';


class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            loginId: null,
            loginPw: null,
        }

        this.stateArrayTest = this.stateArrayTest.bind(this);
    }

    stateArrayTest() {
        this.setState({
            list: update(
                this.state.list, 
                {
                    $push: ['1', '2', '3']
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
            {arr[2]}<br/>
            {arr.length}
            </div>
        );

        return(
            <div>
                임시 작업용 페이지

                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
                <hr/>
                <button onClick={this.getTweet}>getTweet</button>
            </div>
        );
    }
};

export default Link2;