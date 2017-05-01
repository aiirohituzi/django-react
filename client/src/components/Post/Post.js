import React from 'react';

import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
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
        }
    }

    componentWillReceiveProps (nextProps) {
        
        const { postInfo, postCount } = nextProps;
        
        this.setState({
            postInfo,
            postCount
        })
    }
    
    render() {
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;

        const thumbnailInstance = [];
        for(var i=0; i<postCount; i++) {
            if(postInfo[i] !== undefined){
                thumbnailInstance.push(
                    <Col xs={12} sm={6} md={4} key={postInfo[i].id}>
                        <Thumbnail>
                            <h3>{postInfo[i].title}</h3>
                            <p>{postInfo[i].content}</p>
                            <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                );
            }
        }        
 
        // show nothing when data is not loaded
        if(postInfo === null) return null;
 
        return (
            <div>
                <Grid>
                    <Row>
                        {thumbnailInstance}
                    </Row>
                </Grid>
            </div>
        );
    }
}
 
export default Post;