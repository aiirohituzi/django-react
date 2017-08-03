import React from 'react';
import axios from 'axios';

import update from 'react-addons-update'

import TitleForm from './TitleForm';
import ContentForm from './ContentForm';

import * as service from '../../services/post';

import { ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';

class UpdateDeletePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: null,
            postCount: null,
            showModal: false,
            showImageModal: false,
            clickedId: null,
            clickedTitle: null,
            clickedContent: null,
            clickedListId: null,
            clickedImg: null,
            clickedImgList: [],
            update: false,
            clickedImgIdx: null,
        }

        this.close = this.close.bind(this);
        this.imageClose = this.imageClose.bind(this);
        this.detail = this.detail.bind(this);
        this.delete = this.delete.bind(this);
        this.updateToggle = this.updateToggle.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.imageModalOpen = this.imageModalOpen.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        
        const { postInfo, postCount } = nextProps;

        this.setState({
            postInfo,
            postCount
        })
    }

    detail = async (id, title, content, listId) => {
        await this.getImage(id);
        await this.setState({
            clickedId: id,
            clickedTitle: title,
            clickedContent: content,
            clickedListId: listId
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
                // img = response.data
                for(var i=0; i<response.data.length; i++){
                    console.log(i + ' : ' + response.data[i])
                    img.push(response.data[i])
                }
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

    update = async (state, postId, listId) => {
        this.updateToggle(state);
        
        if(state){
            var data = new FormData();

            var upCheck = document.getElementById('imgUpdateCheck').checked;
            var delCheck = document.getElementById('imgDelCheck').checked;
            var image = null;

            var title = document.getElementById('formTitle').value;
            var content = document.getElementById('formContent').value;
            var loginId = sessionStorage.getItem('loginId');
            var loginPw = sessionStorage.getItem('loginPw');
            var postInfo = this.state.postInfo;
            var clickedTitle = this.state.clickedTitle;
            var clickedContent = this.state.clickedContent;

            var updateResult = false;

            if(delCheck){
                image = 'None';
                data.append('image', image);
            }else if(upCheck){
                image = document.getElementById('formControlsUpdateImage').files;
                // console.log(image);
                // console.log('---------------------')

                if(image == undefined){
                    image = null;
                    console.log('Not selected');
                    alert('파일을 선택해주세요');

                    // document.getElementById('imgUpdateCheck').checked = false;
                    return;
                } else {
                    var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
                    // console.log(fileExtension.indexOf(image['name'].split('.').pop().toLowerCase()));

                    for(var i=0; i<image.length; i++){
                        if (fileExtension.indexOf(image[i]['name'].split('.').pop().toLowerCase()) == -1){
                            alert("'.jpeg','.jpg', '.png', '.gif', '.bmp' 형식의 파일만 업로드 가능합니다.");

                            return;
                        }
                    }
                }

                data.append('image', image[0]);
            }

            // console.log(title);
            // console.log(content);
            // console.log(postId);

            data.append('postId', postId);
            data.append('user', loginId);
            data.append('password', loginPw);
            data.append('title', title);
            data.append('content', content);
            // data.append('image', image);

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            await axios.post('http://127.0.0.1:8000/update/', data, config)
            .then(function (response) {
                if(response.data == 'True'){
                    postInfo[listId].title = title;
                    postInfo[listId].content = content;
                    clickedTitle = title;
                    clickedContent = content;

                    updateResult = true;
                } else {
                    console.log('Error');
                    alert('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            // document.getElementById('imgUpdateCheck').checked = false;
            // document.getElementById('imgDelCheck').checked = false;

            
            if(updateResult && (image != 'None')){
                for(var i=0; i<image.length; i++){
                    data = new FormData();

                    data.append('user', loginId);
                    data.append('password', loginPw);
                    data.append('image', image[i])

                    await axios.post('http://127.0.0.1:8000/upImage/', data, config)
                    .then(function (response) {
                        // console.log(response.data);
                        if(response.data == 'True'){
                            // console.log(response.data);
                            console.log('Image Upload success');
                        } else {
                            console.log('Error');
                            alert('Error');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }



            await this.getImage(postId);
            this.setState({
                postInfo: postInfo,
                clickedTitle: clickedTitle,
                clickedContent: clickedContent
            });
        }

        this.updateToggle(state);
        this.forceUpdate();
    }

    updateToggle(state) {
        this.setState({
            update: !state
        });
    }

    delete = async (postId, listId) => {
        var decision = confirm('정말로 삭제하시겠습니까?');

        if(decision){
            var loginId = sessionStorage.getItem('loginId');
            var loginPw = sessionStorage.getItem('loginPw');
            var postInfo = this.state.postInfo;

            await axios.post('http://127.0.0.1:8000/delete/', {
                postId: postId,
                user: loginId,
                password: loginPw
            })
            .then(function (response) {
                // console.log(response.data);
                if(response.data == 'True'){
                    // console.log(response.data);
                    // console.log(postInfo);
                    delete postInfo[listId];
                } else {
                    console.log('Error');
                    alert('Error');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            // console.log(postInfo);
            
            this.close();
            this.forceUpdate();
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
        this.setState({
            showModal: false,
            update: false
        });
    }

    imageClose(){
        this.setState({
            showImageModal: false,
            showModal: true,
            clickedImgIdx: null,
        });
    }
    
    render() {
        let postInfo = this.state.postInfo;
        const postCount = this.state.postCount;

        if(postInfo == null){           // warning disable
           postInfo = [{'title': 'temp'},];
        }

        const listInstance = [];
        for(var i=0; i<postCount; i++) {
            if(postInfo[i] !== undefined){
                listInstance.push(                    
                    <ListGroupItem key={ postInfo[i].id } onClick={ this.detail.bind(this, postInfo[i].id, postInfo[i].title, postInfo[i].content, i) }>
                        { postInfo[i].title }
                    </ListGroupItem>
                );
            }
        }

        const clickedId = this.state.clickedId;
        const clickedTitle = this.state.clickedTitle;
        const clickedContent = this.state.clickedContent;
        const clickedListId = this.state.clickedListId;

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

        const update = this.state.update;

        const modalInstance = [];
        modalInstance.push(
                <Modal.Header closeButton>
                    <Modal.Title>
                        <TitleForm
                            update={ update }
                            title={ clickedTitle }
                        />
                    </Modal.Title>
                </Modal.Header>
        );
        modalInstance.push(
                <Modal.Body>
                    <ContentForm
                        update={ update }
                        content={ clickedContent }
                        image={ clickedImg }
                    />
                </Modal.Body>
        );
        if(!update){
            modalInstance.push(
                <Modal.Footer>
                    <Button bsClass="btn" onClick={ this.close }>닫기</Button>
                    <Button bsClass="btn" onClick={ this.update.bind(this, update, clickedId, clickedListId) }>수정</Button>
                    <Button bsClass="btn btn-danger" onClick={ this.delete.bind(this, clickedId, clickedListId) }>삭제</Button>
                </Modal.Footer>
            );
        } else {
            modalInstance.push(
                <Modal.Footer>
                    <Button bsClass="btn" onClick={ this.close }>닫기</Button>
                    <Button bsClass="btn" onClick={ this.update.bind(this, update, clickedId, clickedListId) }>수정</Button>
                    <Button bsClass="btn" onClick={ this.updateToggle.bind(this, update) }>취소</Button>
                </Modal.Footer>
            );
        }


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

 
        // show nothing when data is not loaded
        if(postInfo === null) return null;
 
        return (
            <ListGroup>
                { listInstance }
                <Modal backdrop='false' show={ this.state.showModal } onHide={ this.close }>
                    { modalInstance }
                </Modal>
                {imageDetailInstance}
            </ListGroup>
        );
    }
}
 
export default UpdateDeletePost;