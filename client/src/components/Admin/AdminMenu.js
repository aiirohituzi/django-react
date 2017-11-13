import React from 'react';
import axios from 'axios';
import * as service from '../../services/post';
import UploadPost from './UploadPost';
import UpdateDeletePost from './UpdateDeletePost';
import { Tab, Row, Col, Nav, NavItem, Button, Form, InputGroup, FormGroup, FormControl } from 'react-bootstrap';

class AdminMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            postInfo: null,
            postCount: 4,
            btnValue: "더 보기",
            search: "",
        };

        this.handleMore = this.handleMore.bind(this);
        // this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchPost = this.searchPost.bind(this);
    }

    componentDidMount() {
        this.fetchPostInfo();
    }

    fetchPostInfo = async () => {
        const info = await service.getPost();
        // console.log(info);

        const postInfo = info.data;
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

    // handleSelect(e) {
    //     console.log('asdf');
    //     switch(e){
    //         case second:
    //             this.fetchPostInfo();
    //             break;
    //     }
    // }

    handleChange(e) {
        this.setState({search: e.target.value});
    }

    searchPost = async (val) => {
        var keyword = this.state.search;
        var category = document.getElementById('formControlsSelect').value;

        var data = new FormData();

        var receiveData;

        data.append('category', category)
        data.append('keyword', keyword);

        const config = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post('http://127.0.0.1:8000/search/', data, config)
        .then(function (response) {
            // console.log(response.data)
            receiveData = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

        
        this.setState({
            postInfo: receiveData,
        })
    }

    render() {        
        const postInfo = this.state.postInfo;
        const postCount = this.state.postCount;
        const btnValue = this.state.btnValue;
        const search = this.state.search;


        const searchInstance = (
            <Col xs={12} style={{textAlign: 'right'}}>
                <Form inline>
                    <InputGroup style={{width: '100%', textAlign: 'right'}}>
                        <InputGroup.Addon style={{
                                width: '20%',
                                paddingTop: '0',
                                paddingRight: '0',
                                paddingBottom: '0',
                                paddingLeft: '0',
                            }}>
                            <FormGroup controlId="formControlsSelect" style={{width: '100%'}}>
                                <FormControl componentClass="select" placeholder="select" style={{width: '100%'}}>
                                    <option value="title">제목</option>
                                    <option value="all">제목+내용</option>
                                </FormControl>
                            </FormGroup>
                        </InputGroup.Addon>

                        <FormControl type="text" value={ search } onChange={ this.handleChange } style={{width: '100%', height: '51'}} />
                        
                        <InputGroup.Button style={{width: '10'}} >
                            <Button bsStyle="primary" style={{height: '51'}} onClick={this.searchPost}>검색</Button>
                        </InputGroup.Button> 
                    </InputGroup>                       
                </Form>
                <br/>
            </Col>
        )

        const moreInstance = [];

        if(postInfo != 'False'){
            moreInstance.push(
                <Button bsStyle="primary" block onClick={this.handleMore}>{btnValue}</Button>
            );
        } else {
            moreInstance.push();
        }

        const tabsInstance = (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                <Col sm={4}>
                    <Nav bsStyle="pills" stacked>
                    <NavItem eventKey="first">
                        게시글 업로드
                    </NavItem>
                    <NavItem eventKey="second" >
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
                        { searchInstance }
                        <UpdateDeletePost
                            postCount={ postCount }
                            postInfo={ postInfo }
                        />
                        { moreInstance }
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