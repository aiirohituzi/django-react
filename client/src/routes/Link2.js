// import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import React from 'react';

import { Grid, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';


class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tweetList: null,
            count: 10,
        }

        this.listHandler = this.listHandler.bind(this);
    }

    componentDidMount() {
        this.getTweet();
    }

    getTweet = async () => {
        var tweets = [];
        var count = this.state.count;

        await axios.get('http://127.0.0.1:8000/tweet/?count=' + count)
        .then(function (response) {
            // console.log(response);
            if(!(response.data == 'False')){
                // console.log(response.data.length);
                for(var i=0; i<response.data.length; i++){
                    console.log(i + ' : ' + response.data[i]);
                    tweets.push(response.data[i].text);
                }
                console.log(response);
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

    listHandler(e){
        console.log(this);
        if(e.target.className === 'list-group-item active'){
          e.target.className = 'list-group-item';
        }else{
          e.target.className = 'list-group-item active';
        }
    }

    more = async () => {
        await this.setState({
            count: this.state.count+10,
        });
        if(this.state.count<200){
            this.getTweet();
        }
    }

    render() {
        const tweetList = this.state.tweetList;
        const count = this.state.count;

        var btnValue = "더 보기"

        const tweetListInstance = [];
        if(tweetList != null){
            for(var i=0; i<tweetList.length; i++){
                tweetListInstance.push(
                    <ListGroupItem onClick={this.listHandler.bind(this)}>
                        {tweetList[i]}
                    </ListGroupItem>
                );
            }
        } else {
            tweetListInstance.push(
                <div>
                    no data
                </div>
            );
        }


        if(count>200){
            btnValue = "X"
        }

        return(
            <Grid>
                <ListGroup>
                    {tweetListInstance}
                </ListGroup>
                <Button onClick={this.more} block>{ btnValue }</Button>
            </Grid>
        );
    }
};

export default Link2;