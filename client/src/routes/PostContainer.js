import React from 'react';

import * as service from '../services/post';
import Post from '../components/Post/Post';

import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';
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

    render() {
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;
        const btnValue = this.state.btnValue;

        return (
            <div>
                <Grid>
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
                            <ButtonToolbar>
                                <Button bsStyle="primary" block onClick={this.handleMore}>{btnValue}</Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}