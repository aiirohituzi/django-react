import React from 'react';
import * as service from '../../services/post';
import { Tab, Row, Col, Nav, NavItem, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class AdminMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            postInfo: null,
        };
    }

    componentDidMount() {
        this.fetchPostInfo();
    }

    fetchPostInfo = async () => {
        const info = await service.getPost();
        console.log(info);

        const postInfo = info.data.results;
        this.setState({
            postInfo
        });
    }

    render() {
        const postInfo = this.state.postInfo;
        console.log('in render');
        // var count = Object.keys(postInfo).length;
        // console.log(count);
        // const tableInstance = [];

        // for(var i=0; i++; i)

        const tabsInstance = (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                <Col sm={4}>
                    <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="first">
                        게시글 업로드
                    </NavItem>
                    <NavItem eventKey="second">
                        게시글 삭제
                    </NavItem>
                    </Nav>
                </Col>
                <Col sm={8}>
                    <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                        aa
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <ListGroup>
                            <ListGroupItem>Some body text</ListGroupItem>
                            <ListGroupItem href='#'>Linked item</ListGroupItem>
                            <ListGroupItem>Danger styling</ListGroupItem>
                        </ListGroup>
                    </Tab.Pane>
                    </Tab.Content>
                </Col>
                </Row>
            </Tab.Container>
        );
        return (
            <div>
                {tabsInstance}
            </div>
        );
    }
}

export default AdminMenu;