import React from 'react';
import axios from 'axios';

import { Grid, Row, Col, Thumbnail, Button, Modal } from 'react-bootstrap';
// import Grid from 'react-bootstrap/lib/Grid';
// import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';
// import Thumbnail from 'react-bootstrap/lib/Thumbnail';
// import Button from 'react-bootstrap/lib/Button';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: null,
            postCount: null,
            showModal: false,
            clickedId: 1,
            clickedTitle: null,
            clickedContent: null,
            clickedImg: null,
        }

        this.close = this.close.bind(this);
        //this.detail = this.detail.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        
        const { postInfo, postCount } = nextProps;
        
        this.setState({
            postInfo,
            postCount
        })
    }

    close() {
        this.setState({ showModal: false });
    }

    detail = async (id, title, content) => {
        await this.getImage(id);
        await this.setState({
            clickedId: id,
            clickedTitle: title,
            clickedContent: content,
        });
        this.modalOpen();
        // console.log('clicked ' + idx);
    }

    getImage = async (id) => {
        var data = new FormData();
        var img;
        data.append('postId', id);

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        await axios.post('http://127.0.0.1:8000/images/', data, config)
        .then(function (response) {
            // console.log(response);
            if(!(response.data == 'False')){
                img = 'data:image/png;base64,' + response.data;
            } else {
                img = null;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            clickedImg: img
        });
    }

    modalOpen() {
        this.setState({
            showModal: true,
        });
        // console.log('clickId : ' + this.state.clickedId);
    }
    
    render() {
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;
        const clickedId = this.state.clickedId;

        const thumbnailInstance = [];
        for(var i=0; i<postCount; i++) {
            if(postInfo[i] !== undefined){
                // console.log('확인된 포스트 id : ' + postInfo[i].id)
                // console.log(thumbnailInstance)
                thumbnailInstance.push(
                    <Col xs={12} sm={6} md={4} key={postInfo[i].id}>
                        <Thumbnail>
                            <h3>{postInfo[i].title}</h3>
                            <hr/>
                            {/*<p>{postInfo[i].content}</p>*/}
                            <p style={{textAlign:"right"}}>
                                <Button bsStyle="primary" onClick={ this.detail.bind(this, postInfo[i].id, postInfo[i].title, postInfo[i].content) }>내용 보기</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                );
            }
        }

        const clickedTitle = this.state.clickedTitle;
        const clickedContent = this.state.clickedContent;
        var clickedImg;
        if(this.state.clickedImg == null){
            clickedImg = ('');
        }
        else {
            clickedImg = (
                <div>
                    <img src={this.state.clickedImg} style={{width: 200}}/>
                </div>
            )
        }

        const modalInstance = (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickedImg}
                    {clickedContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
 
        // show nothing when data is not loaded
        if(postInfo === null) return null;
 
        return (
            <div>
                <Grid>
                    <Row>
                        {thumbnailInstance}
                        {modalInstance}
                    </Row>
                </Grid>
            </div>
        );
    }
}
 
export default Post;