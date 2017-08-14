import React from 'react';
import axios from 'axios';

import * as service from '../services/post';
import Post from '../components/Post/Post';

import { Button, Grid, Row, Col, Form, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
// import Button from 'react-bootstrap/lib/Button';
// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
// import Grid from 'react-bootstrap/lib/Grid';
// import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';

export default class PostContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postInfo: null,
            postCount: 4,
            btnValue: "더 보기"
        };

        this.handleMore = this.handleMore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchPost = this.searchPost.bind(this);
    }

    componentDidMount() {
        this.fetchPostInfo();
    }

    fetchPostInfo = async () => {
        const info = await service.getPost();
        // console.log(info);

        const postInfo = info.data.results;
        this.setState({
            postInfo
        });
    }

    handleMore(e) {
        const postInfo = this.state.postInfo;
        if(postInfo[this.state.postCount] === undefined){
            this.setState({
                btnValue: "게시물이 더 이상 존재하지 않습니다."
            })
        } else{
            this.setState({
                postCount: this.state.postCount+4
            });
        }
    }

    handleChange(e) {
        this.setState({search: e.target.value});
    }

    searchPost = async (val) => {
        var keyword = this.state.search;
        var category = document.getElementById('formControlsSelect').value;

        var data = new FormData();

        var receiveData;

        data.append('category', category)
        data.append('keyword', keyword);

        const config = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post('http://127.0.0.1:8000/search/', data, config)
        .then(function (response) {
            // console.log(response.data)
            receiveData = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

        
        this.setState({
            postInfo: receiveData,
        })
    }

    render() {
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;
        const btnValue = this.state.btnValue;
        const update = this.state.update;
        const search = this.state.search;


        const searchInstance = (
            <Col xs={12}>
                <Form inline>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="select">
                            <option value="title">제목</option>
                            <option value="all">제목+내용</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formInlineCategory">
                        <FormControl type="text" value={ search } onChange={ this.handleChange } />
                    </FormGroup>                
                    <Button bsStyle="primary" onClick={this.searchPost}>검색</Button>                        
                </Form>
            </Col>
        )


        const moreInstance = [];

        if(postInfo != 'False'){
            moreInstance.push(
                <Button bsStyle="primary" block onClick={this.handleMore}>{btnValue}</Button>
            );
        } else {
            moreInstance.push();
        }

        return (
            <div>
                <Grid>
                    <Row>
                        <Col>
                            {searchInstance}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Post
                                postCount={ postCount }
                                postInfo={ postInfo }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {moreInstance}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}