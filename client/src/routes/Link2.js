// import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import React from 'react';

import { Grid, Button, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';


class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tweetList: null,
            count: 10,
            showModal: false,
            target: null,
        }

        this.listHandler = this.listHandler.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.close = this.close.bind(this);
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
                    // console.log(i + ' : ' + response.data[i]);
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

    listHandler = async (e) => {
        if(e.target.className === 'list-group-item active'){
            e.target.className = 'list-group-item';
        }else{
            e.target.className = 'list-group-item active';
            await this.setState({
                target: e.target,
            });
            this.modalOpen();
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

    modalOpen() {
        this.setState({
            showModal: true,
        });
    }

    close() {
        this.setState({ showModal: false });
        this.state.target.className = 'list-group-item';
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

        const modalInstance = (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );


        if(count>200){
            btnValue = "X"
        }

        return(
            <Grid>
                <ListGroup>
                    {tweetListInstance}
                </ListGroup>
                {modalInstance}
                <Button onClick={this.more} block>{ btnValue }</Button>
            </Grid>
        );
    }
};

export default Link2;