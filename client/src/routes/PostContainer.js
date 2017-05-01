import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import * as service from '../services/post';
import Post from '../components/Post/Post';

export default class PostContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: 1,
            post: {
                title: null,
                content: null
            }
        };
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    fetchPostInfo = async (postId) => {
        const info = await service.getPost();
        console.log(info.data.results[0]);

        const {title, content} = info.data.results[0]; 

        this.setState({
            postId,
            post: {
                title, 
                content
            }
        });
    }

    render() {
        const {postId, post} = this.state;

        return (
            <div>
                <Post
                    postId={postId}
                    title={post.title}
                    content={post.content}
                />
            </div>
        );
    }
}