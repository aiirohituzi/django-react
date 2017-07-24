import React from 'react';
import axios from 'axios';

import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class UploadPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formCount: 1,
            formAddBtnValue: '+',
        }

        this.upload = this.upload.bind(this);
        this.addForm = this.addForm.bind(this);
    }

    upload = async () => {
        var data = new FormData();

        var loginId = sessionStorage.getItem('loginId');
        var loginPw = sessionStorage.getItem('loginPw');

        var title = document.getElementById('formControlsTitle').value;
        var content = document.getElementById('formControlsContent').value;
        var image = document.getElementById('formControlsImage').files;

        if(title == ''){
            alert('제목을 입력해주세요.');
            document.getElementById('formControlsTitle').focus();
            return;
        }
        if(content == ''){
            alert('글 내용을 입력해주세요.');
            document.getElementById('formControlsContent').focus();
            return;
        }

        if(image == undefined){
            image = null;
            console.log('Not selected');
        } else {
            var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
            // console.log(fileExtension.indexOf(image['name'].split('.').pop().toLowerCase()));
            for(var i=0; i<this.state.formCount; i++){
                if (fileExtension.indexOf(image[i]['name'].split('.').pop().toLowerCase()) == -1){
                    alert("'.jpeg','.jpg', '.png', '.gif', '.bmp' 형식의 파일만 업로드 가능합니다.");

                    document.getElementById('formControlsTitle').value = null;
                    document.getElementById('formControlsContent').value = null;
                    document.getElementById('formControlsImage').value = null;

                    return;
                }
            }
        }

        data.append('user', loginId);
        data.append('password', loginPw);
        data.append('title', title);
        data.append('content', content);

        data.append('image', image[0]);

        // for(var i=0; i<this.state.formCount; i++){
        //     data.append('image'+i, image[i]);
        //     console.log('image'+i)
        //     console.log(image[i])
        // }

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        await axios.post('http://127.0.0.1:8000/upload/', data, config)
        .then(function (response) {
            // console.log(response.data);
            if(response.data == 'True'){
                // console.log(response.data);
                alert('Upload success');

                document.getElementById('formControlsTitle').value = null;
                document.getElementById('formControlsContent').value = null;
                document.getElementById('formControlsImage').value = null;
            } else {
                console.log('Error');
                alert('Error');
            }
        })
        .catch(function (error) {
            console.log(error);
        });

        
        window.location.reload(true);
    }

    addForm() {
        if(this.state.formCount<4){
            this.setState({
                formCount: this.state.formCount+1
            });
        } else {
            this.setState({
                formAddBtnValue: '이미지 업로드는 최대 4개 까지만'
            })
        }
    }

    render() {
        const formAddBtnValue = this.state.formAddBtnValue;
        const fileInstance = [];

        for(var i=0; i<this.state.formCount; i++){
            fileInstance.push(
                <FormControl type="file" />
            );
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={8} md={8}>
                        <FormGroup controlId="formControlsTitle">
                            <ControlLabel>제목</ControlLabel>
                            <FormControl type="text" placeholder="글 제목을 입력해주세요." />
                        </FormGroup>
                        <FormGroup controlId="formControlsContent">
                            <ControlLabel>글 내용</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} />
                        </FormGroup>
                        <FormGroup controlId="formControlsImage">
                            <ControlLabel>이미지 업로드</ControlLabel> <Button bsClass="btn btn-primary" onClick={ this.addForm }>{formAddBtnValue}</Button>
                            {fileInstance}
                        </FormGroup>
                        <Button bsClass="btn btn-primary pull-right" onClick={ this.upload.bind(this) }>Upload</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default UploadPost;