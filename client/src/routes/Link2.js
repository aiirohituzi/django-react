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
            tweetList: null,
        }

        this.stateArrayTest = this.stateArrayTest.bind(this);
        this.getTweet = this.getTweet.bind(this);
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

    getTweet = async () => {
        var tweets = [];

        await axios.get('http://127.0.0.1:8000/tweet/')
        .then(function (response) {
            // console.log(response);
            if(!(response.data == 'False')){
                // console.log(response.data.length);
                for(var i=0; i<response.data.length; i++){
                    console.log(i + ' : ' + response.data[i])
                    tweets.push(response.data[i])
                }
                console.log(response)
                // img = response.data[0]
            } else {
                tweets = null;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            tweetList: tweets,
        });    
    }

    render() {
        const arr = this.state.list;
        const tweetList = this.state.tweetList

        console.log(tweetList);
        
        const arrInstance = (
            <div>
            {arr[0]}<br/>
            {arr[1]}<br/>
            {arr[2]}<br/>
            {arr.length}
            </div>
        );

        const tweetListInstance = [];

        if(tweetList != null){
            tweetListInstance.push(
                <div>
                {tweetList[0]}
                {tweetList[1]}
                {tweetList[2]}
                </div>
            )
        } else {
            tweetListInstance.push(
                <div>
                    no data
                </div>
            )
        }

        return(
            <div>
                임시 작업용 페이지

                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
                <hr/>
                <button onClick={this.getTweet}>getTweet</button>
                {tweetList}
            </div>
        );
    }
};

export default Link2;