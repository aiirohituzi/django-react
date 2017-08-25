// import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import React from 'react';

import { Grid, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';


class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loginId: null,
            loginPw: null,
            tweetList: null,
        }

        this.getTweet = this.getTweet.bind(this);
    }

    getTweet = async () => {
        var tweets = [];

        await axios.get('http://127.0.0.1:8000/tweet/')
        .then(function (response) {
            // console.log(response);
            if(!(response.data == 'False')){
                // console.log(response.data.length);
                for(var i=0; i<response.data.length; i++){
                    // console.log(i + ' : ' + response.data[i])
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
        const tweetList = this.state.tweetList

        const tweetListInstance = [];
        if(tweetList != null){
            for(var i=0; i<tweetList.length; i++){
                tweetListInstance.push(
                    <ListGroupItem>
                        {tweetList[i]}
                    </ListGroupItem>
                );
            }
        } else {
            tweetListInstance.push(
                <div>
                    no data
                </div>
            )
        }

        return(
            <Grid>
                <button onClick={this.getTweet}>getTweet</button>
                <ListGroup>
                    {tweetListInstance}
                </ListGroup>
            </Grid>
        );
    }
};

export default Link2;