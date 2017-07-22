import React from 'react';
import axios from 'axios';
import update from 'react-addons-update'

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            imgInfo: '',
            list: [],
        }

        this.getImage = this.getImage.bind(this);
        this.stateArrayTest = this.stateArrayTest.bind(this);
    }

    getImage = async () => {
        var data = new FormData();
        var img;
        data.append('postId', '27');

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        await axios.post('http://127.0.0.1:8000/images/', data, config)
        .then(function (response) {
            console.log(response);
            img = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            imgInfo: img
        });
    }

    stateArrayTest() {
        this.setState({
            list: update(
                this.state.list, 
                {
                    $push: ['1', '2']
                }
            )
        });
    }

    render() {
        const imgPath = 'data:image/png;base64,' + this.state.imgInfo;
        const arr = this.state.list;
        
        const arrInstance = (
            <div>
            {arr[0]}<br/>
            {arr[1]}<br/>
            {arr.length}
            </div>
        )

        const imgInstance = (
            <img src={imgPath} width="80%" />
        );
        return(
            <div>
                임시 작업용 페이지
                <input type="file" onChange={this.changeFile}/>
                <button onClick={this.importFile}>Import</button>
                <hr />
                <button onClick={this.getImage}>getImageTest</button>
                {imgInstance}
                <img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../image/2017/07/12/orig/test_image.png")} />
                <button onClick={this.stateArrayTest}>state array test</button>
                {arrInstance}
            </div>
        );
    }
};

export default Link2;