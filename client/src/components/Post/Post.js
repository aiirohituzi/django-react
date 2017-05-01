import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: {
                title: null,
                content: null
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        
        const { title, content } = nextProps;
        
        this.setState({
            postInfo: {
                title, content
            }
        })
    }
    
    render() {
        const { title, content } = this.state.postInfo;
        console.log(title);
        console.log('contente: '+content);

        const thumbnailInstance = (
            <Grid>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Thumbnail>
                            <h3>{title}</h3>
                            <p>{content}</p>
                            <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Thumbnail>
                            <h3>Title</h3>
                            <p>Content</p>
                            <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Thumbnail>
                            <h3>Title</h3>
                            <p>Content</p>
                            <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Thumbnail>
                            <h3>Title</h3>
                            <p>Content</p>
                            <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        );
 
        // show nothing when data is not loaded
        if(title===null) return null;
 
        return (
            <div>
                {thumbnailInstance}
            </div>
        );
    }
}
 
export default Post;