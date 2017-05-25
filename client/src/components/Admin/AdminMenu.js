import React from 'react';
import * as service from '../../services/post';
import UploadPost from './UploadPost';
import UpDelPost from './UpDelPost';
import { Tab, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';

class AdminMenu extends React.Component {
    constructor(props) {
        super(props)

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

        const tabsInstance = (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                <Col sm={4}>
                    <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="first">
                        게시글 업로드
                    </NavItem>
                    <NavItem eventKey="second">
                        게시글 수정 및 삭제
                    </NavItem>
                    </Nav>
                </Col>
                <Col sm={8}>
                    <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                        <UploadPost />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <UpDelPost
                            postCount={ postCount }
                            postInfo={ postInfo }
                        />
                        <Button bsStyle="primary" block onClick={this.handleMore}>{btnValue}</Button>
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