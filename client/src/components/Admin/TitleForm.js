import React from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TitleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            update: null,
            title: null,
        }
    }

    componentWillReceiveProps (nextProps) {
        
        const { update, title } = nextProps;

        this.setState({
            update,
            title
        })
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.title] = e.target.value;
        this.setState(nextState)
        // this.setState({[e.target.title]: e.target.value});
    }

    render() {
        const update = this.state.update;
        const title = this.state.title;
        const titleInstance = [];

        if(update){
            titleInstance.push(
                <FormGroup controlId="formTitle">
                    <ControlLabel>제목</ControlLabel>
                    <FormControl type="text" placeholder="글 제목을 입력해주세요." value={ title } onChange={ this.handleChange } />
                    {/*<FormControl type="text" placeholder="글 제목을 입력해주세요."/>*/}
                </FormGroup>
            );
        } else {
            titleInstance.push(
                title
            )
        }

        return (
            <div>
                {titleInstance}
            </div>
        );
    }
}

export default TitleForm;