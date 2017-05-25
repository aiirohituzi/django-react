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

    render() {
        const update = this.state.update;
        const content = this.state.content;
        const contentInstance = [];

        if(update){
            contentInstance.push(
                <FormGroup controlId="formContent">
                    <FormControl componentClass="textarea" placeholder="Content" style={{ height: 200 }} value={ content } />
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