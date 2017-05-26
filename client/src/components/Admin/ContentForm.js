import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: null,
            content: null,
        }
    }

    componentWillReceiveProps (nextProps) {
        
        const { update, content } = nextProps;

        this.setState({
            update,
            content
        })
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.title] = e.target.value;
        this.setState(nextState)
    }

    render() {
        const update = this.state.update;
        const content = this.state.content;
        const contentInstance = [];

        if(update){
            contentInstance.push(
                <FormGroup controlId="formContent">
                    <FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} value={ content } onChange={ this.handleChange } />
                    {/*<FormControl componentClass="textarea" placeholder="글 내용을 입력해주세요." style={{ height: 200 }} />*/}
                </FormGroup>
            );
        } else {
            contentInstance.push(
                content
            )
        }

        return (
            <div>
                {contentInstance}
            </div>
        );
    }
}

export default ContentForm;