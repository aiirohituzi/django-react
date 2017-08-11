import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            imgInfo: '',
            list: [],
            loginId: null,
            loginPw: null
        }


        this.test = this.test.bind(this);
        this.getImage = this.getImage.bind(this);
        this.stateArrayTest = this.stateArrayTest.bind(this);
        this.searchTest = this.searchTest.bind(this);
    }


    searchTest = async () => {
        var data = new FormData();

        data.append('keyword', 'test');

        const config = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post('http://127.0.0.1:8000/search/', data, config)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

        // console.log(axios.get('http://127.0.0.1:8000/posting/'));
    }
    

    test = async () => {
        var data = new FormData();

        var image = document.getElementById('formControlsImage').files;
        data.append('image', image);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        await axios.post('http://127.0.0.1:8000/test/', data, config)
        .then(function (response) {
            console.log('ㅇㅇㅇㅇㅇ')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getImage = async () => {
        var data = new FormData();
        var img;
        data.append('postId', '27');

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        await axios.post('http://127.0.0.1:8000/images/', data, config)
        .then(function (response) {
            console.log(response);
            img = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            imgInfo: img
        });
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
        const imgPath = 'data:image/png;base64,' + this.state.imgInfo;
        const arr = this.state.list;
        
        const arrInstance = (
            <div>
            {arr[0]}<br/>
            {arr[1]}<br/>
            {arr.length}
            </div>
        )

        const imgInstance = (
            <img src={imgPath} width="80%" />
        );
        return(
            <div>
                임시 작업용 페이지

                <Button onClick={ this.searchTest }>searchtest</Button>
                
                <hr />
                <FormGroup controlId="formControlsImage">
                    <ControlLabel>이미지 업로드</ControlLabel>
                    <FormControl type="file" multiple />
                </FormGroup>
                <Button bsClass="btn btn-primary" onClick={ this.test.bind(this) }>test</Button>
                <hr />
                <button onClick={this.getImage}>getImageTest</button>
                {imgInstance}
                <img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../image/2017/07/12/orig/test_image.png")} />
                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
            </div>
        );
    }
};

export default Link2;