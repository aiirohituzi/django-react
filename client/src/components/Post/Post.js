import React from 'react';
import axios from 'axios';

import update from 'react-addons-update'    // state안에 array 삽입 위한 라이브러리

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
            showImageModal: false,
            clickedId: 1,
            clickedTitle: null,
            clickedContent: null,
            clickedImg: null,
            clickedImgList: [],
            clickedImgIdx: null,
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

    close(dist) {
        switch(dist){
            case 0:
                this.setState({ showModal: false });
                break;
            case 1:
                this.setState({ showImageModal: false });
                break;
        }
    }

    detail = async (id, title, content) => {
        await this.getImage(id);
        await this.setState({
            clickedId: id,
            clickedTitle: title,
            clickedContent: content,
        });
        this.modalOpen(0);
        // console.log('clicked ' + idx);
    }

    getImage = async (id) => {
        var data = new FormData();
        var img = [];
        data.append('postId', id);

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        await axios.post('http://127.0.0.1:8000/images/', data, config)
        .then(function (response) {
            // console.log(response);
            if(!(response.data == 'False')){
                // img = 'data:image/png;base64,' + response.data;
                // console.log(response.data)
                for(var i=0; i<response.data.length; i++){
                    console.log(i + ' : ' + response.data[i])
                    img.push(response.data[i])
                }
                // img = response.data[0]
            } else {
                img = null;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        if(img == null){
            this.setState({
                clickedImg: false
            });    
        } else {
            this.setState({
                clickedImgList: [],
            })
            for(var i=0; i<img.length; i++) {
                // console.log(img[i])
                this.setState({
                    // clickedImg: img
                    clickedImg: true,
                    clickedImgList: update(
                        this.state.clickedImgList,
                        {
                            $push: [img[i]]
                        }
                    )
                });
            }
        }
    }

    modalOpen(dist) {
        this.setState({
            showModal: true,
        });
        // console.log('clickId : ' + this.state.clickedId);
    }

    imageModalOpen = async (idx) => {
        await this.setState({
            showImageModal: true,
            clickedImgIdx: idx,
        });
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
        var clickedImg = [];
        var clickedImgList = [];

        if(!this.state.clickedImg){
            clickedImg = ('');
        }
        else {
            for(var i=0; i<this.state.clickedImgList.length; i++){
                clickedImgList.push(
                    <img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../../image/"+ this.state.clickedImgList[i])} style={{width: '44%', marginLeft: '3%', marginRight: '3%'}} onClick={this.imageModalOpen.bind(this, i)}/>
                );
            }
            clickedImg = (
                <div style={{'text-align': 'center'}}>
                    {clickedImgList}
                    <hr/>
                </div>
            )
        }

        const modalInstance = (
            <Modal show={this.state.showModal} onHide={this.close.bind(this, 0)}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clickedImg}
                    {clickedContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this, 0)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );


        const clickedImgIdx = this.state.clickedImgIdx;
        var imgDetail = [];

        if(!clickedImgIdx){
            imgDetail = ('');
        } else {
            imgDetail.push(
                <div>
                    <img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../../image/"+ this.state.clickedImgList[clickedImgIdx])} /> 
                </div>
            )
        }

        const imageDetailInstance = (
            <Modal show={this.state.showImageModal} onHide={this.close.bind(this, 1)}>
                <Modal.Body>
                    {{imgDetail}}
                </Modal.Body>
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
                        {imageDetailInstance}
                    </Row>
                </Grid>
            </div>
        );
    }
}
 
export default Post;