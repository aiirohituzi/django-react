import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

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

    render() {
        const update = this.state.update;
        const title = this.state.title;
        const titleInstance = [];

        if(update){
            titleInstance.push(
                <FormGroup controlId="formTitle">
                    <FormControl type="text" placeholder="Enter title" value={title}/>
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