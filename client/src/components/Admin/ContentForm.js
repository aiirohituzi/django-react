import React from 'react';

import { FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: null,
            content: null,
            image: null,
            updateChecked: false,
            deleteChecked: false,
        }

        this.handleChangeUpdateCheckBox = this.handleChangeUpdateCheckBox.bind(this);
        this.handleChangeDeleteCheckBox = this.handleChangeDeleteCheckBox.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        
        const { update, content, image } = nextProps;

        this.setState({
            update,
            content,
            image
        })
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.title] = e.target.value;
        this.setState(nextState)
    }

    handleChangeUpdateCheckBox = async(e) => {
        await this.setState({ updateChecked: e.target.checked });
        if(this.state.updateChecked){
            document.getElementById('imgDelCheck').disabled=true;
        }else{
            document.getElementById('imgDelCheck').disabled=false;
        }
    }

    handleChangeDeleteCheckBox = async(e) => {
        await this.setState({ deleteChecked: e.target.checked });
        if(this.state.deleteChecked){
            document.getElementById('imgUpdateCheck').disabled=true;
        }else{
            document.getElementById('imgUpdateCheck').disabled=false;
        }
    }

    render() {
        const update = this.state.update;
        const content = this.state.content;
        const image = this.state.image;
        const contentInstance = [];
        const imageInstance = [];

        if(update){
            contentInstance.push(
                <FormGroup controlId="formContent">
                    <ControlLabel>글 내용</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} value={ content } onChange={ this.handleChange } />
                    {/*<FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} />*/}
                </FormGroup>
            );
            imageInstance.push(
                <FormGroup>
                    <Checkbox inline id="imgUpdateCheck" checked={this.state.updateChecked} onChange={this.handleChangeUpdateCheckBox} >
                        이미지 수정
                    </Checkbox>
                    <Checkbox inline id="imgDelCheck" checked={this.state.deleteChecked} onChange={this.handleChangeDeleteCheckBox} >
                        이미지 삭제
                    </Checkbox>
                </FormGroup>
            );
            if(this.state.updateChecked){
                imageInstance.push(
                    <FormGroup controlId="formControlsUpdateImage">
                        <FormControl type="file" />
                    </FormGroup>
                );
            }
        } else {
            contentInstance.push(
                content
            )
            imageInstance.push(
                image
            );
        }

        return (
            <div>
                {imageInstance}
                {contentInstance}
            </div>
        );
    }
}

export default ContentForm;