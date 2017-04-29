import React from 'react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: {
                title: null,
                content: null
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        
        const { title, content} = nextProps;
        
        this.setState({
            postInfo: {
                title, content
            }
        })
    }
    
    render() {
        const { title, content } = this.state.postInfo;
        console.log(title);
        console.log('contente: '+content);
 
        // show nothing when data is not loaded
        if(title===null) return null;
 
        return (
            <div>
                <h1>{title}</h1>
                <p>
                    {content}
                </p>
            </div>
        );
    }
}
 
export default Post;