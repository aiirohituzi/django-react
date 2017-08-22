// import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import React, { Component } from 'react';
import Vue, { observer } from 'react-vue';

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';


const store = new Vue({
    data() {
        return {
            stories: [
                {
                    plot: 'asdfasdf',
                    writer: 'rwers423ewr'
                },
                {
                    plot: 'asd34df',
                    writer: 'rwed634wr'
                },
                {
                    plot: 'aslhjklddf',
                    writer: 'rw13df23ewr'
                },
            ]
        }
    }
});


class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            loginId: null,
            loginPw: null,
            postInfo: null,
        }


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

        const vueInstance = (
            <div class="container">
                <div>
                    <ul class="list-group">
                        <li v-for="story in stories"
                            class="list-group-item"
                        >
                            {store.stories[1].writer} : {store.stories[0].plot}
                        </li>
                    </ul>
                </div>
            </div>
        )

        return(
            <div>
                임시 작업용 페이지

                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
                {vueInstance}
            </div>
        );
    }
};

export default Link2;