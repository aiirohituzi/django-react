import React from 'react';

import { FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: null,
            content: null,
            image: null,
            checkboxChecked: false,
        }

        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
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

    handleChangeCheckBox(e) {
        this.setState({ checkboxChecked: e.target.checked });
        console.log(this.state.checkboxChecked);
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
                    <FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} value={ content } onChange={ this.handleChange } />
                    {/*<FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} />*/}
                </FormGroup>
            );
            imageInstance.push(
                <Checkbox id="formControlsCheck" checked={this.state.checkboxChecked} onChange={this.handleChangeCheckBox} >
                    이미지 수정
                </Checkbox>
            );
            if(this.state.checkboxChecked){
                imageInstance.push(
                    <FormGroup controlId="formControlsImage">
                        <ControlLabel>이미지 업로드</ControlLabel>
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