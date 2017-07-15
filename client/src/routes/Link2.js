import React from 'react';
import axios from 'axios';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            imgInfo: '',
        }

        this.getImage = this.getImage.bind(this);
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

    render() {
        const imgPath = 'data:image/png;base64,' + this.state.imgInfo;
        

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
            </div>
        );
    }
};

export default Link2;