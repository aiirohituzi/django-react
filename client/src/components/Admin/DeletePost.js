import React from 'react';

import { Grid, Row, Col, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';

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
        }

        this.close = this.close.bind(this);
        //this.detail = this.detail.bind(this);
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
        await this.setState({
            clickedId: id,
            clickedTitle: title,
            clickedContent: content,
        });
        this.modalOpen();
        // console.log('clicked ' + idx);
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

        const listInstance = [];
        for(var i=0; i<postCount; i++) {
            if(postInfo[i] !== undefined){
                listInstance.push(                    
                    <ListGroupItem key={postInfo[i].id} onClick={ this.detail.bind(this, postInfo[i].id, postInfo[i].title, postInfo[i].content) }>{postInfo[i].title}</ListGroupItem>
                );
            }
        }

        const clickedTitle = this.state.clickedTitle;
        const clickedContent = this.state.clickedContent;

        const modalInstance = (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{clickedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
            <ListGroup>
                {listInstance}
                {modalInstance}
            </ListGroup>
        );
    }
}
 
export default Post;