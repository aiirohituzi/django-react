import React from 'react';
import axios from 'axios';

import update from 'react-addons-update'    // state안에 array 삽입 위한 라이브러리

import { Grid, Row, Col, Thumbnail, Button, Modal, FormGroup, InputGroup, DropdownButton, FormControl, MenuItem } from 'react-bootstrap';
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
            update: null,
            search: null,
        }

        this.close = this.close.bind(this);
        this.imageClose = this.imageClose.bind(this);
        this.detail = this.detail.bind(this);
        this.getImage = this.getImage.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.imageModalOpen = this.imageModalOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchPost = this.searchPost.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        
        const { postInfo, postCount, update, search } = nextProps;
        
        this.setState({
            postInfo,
            postCount,
            update,
            search
        })
    }


    handleChange(e) {
        this.setState({search: e.target.value});
    }


    searchPost = async (val) => {
        var keyword = this.state.search;

        var data = new FormData();

        data.append('category', 'all')
        data.append('keyword', keyword);

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

    modalOpen() {
        this.setState({
            showModal: true,
        });
        // console.log('clickId : ' + this.state.clickedId);
    }

    imageModalOpen = async (idx) => {
        console.log(idx);
        await this.setState({
            clickedImgIdx: idx,
        });
        this.setState({
            showModal: false,
            showImageModal: true,
        });
        console.log(this.state.clickedImgList[this.state.clickedImgIdx])
    }

    close() {
        this.setState({ showModal: false });
    }

    imageClose(){
        this.setState({
            showImageModal: false,
            showModal: true,
            clickedImgIdx: null,
        });
    }
    
    render() {
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;
        const clickedId = this.state.clickedId;
        const update = this.state.update;
        const search = this.state.search;



        const searchInstance = (
            <form>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" value={ search } onChange={ this.handleChange } />
                        <InputGroup.Button>
                            <Button bsStyle="primary" onClick={this.searchPost}>검색</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        )


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
        var clickedImgListInstance = [];

        if(!this.state.clickedImg){
            clickedImg = ('');
        }
        else {
            for(var i=0; i<this.state.clickedImgList.length; i++){
                clickedImgListInstance.push(
                    <img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../../image/"+ this.state.clickedImgList[i])} style={{width: '44%', marginLeft: '3%', marginRight: '3%'}} onClick={this.imageModalOpen.bind(this, i)} />
                );
            }
            clickedImg = (
                <div style={{textAlign: 'center'}}>
                    {clickedImgListInstance}
                    <hr/>
                </div>
            )
        }

        const modalInstance = (
            <Modal backdrop='false' show={this.state.showModal} onHide={this.close}>
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


        const clickedImgIdx = this.state.clickedImgIdx;
        var imgDetail = [];

        if(clickedImgIdx == null){
            imgDetail = ('');
        } else {
            imgDetail.push(
                <img src={ require("file-loader?name=[sha512:hash:base64:7].[ext]!../../image/" + this.state.clickedImgList[clickedImgIdx]) } style={{width: '100%'}} />
            )
        }

        const imageDetailInstance = (
            <Modal show={this.state.showImageModal} onHide={this.imageClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                    {imgDetail}
                <Modal.Footer>
                </Modal.Footer>
                {/* <img src={ require("file-loader?name=[sha512:hash:base64:7].[ext]!../../image/2017/07/28/orig/test_image.png") } style={{width: '100%'}} />  */}
            </Modal>
        );

        // console.log('*');
        // console.log('modalInstance');
        // console.log(modalInstance);
        // console.log('imageDetailInstance');
        // console.log(imageDetailInstance);

 
        // show nothing when data is not loaded
        if(postInfo === null) return null;
 
        return (
            <div>
                <Grid>
                    <Row>
                        {searchInstance}
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