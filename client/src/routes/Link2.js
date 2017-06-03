import React from 'react';
import axios from 'axios';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            imgInfo: '',
        }

        this.changeFile = this.changeFile.bind(this);
        this.importFile = this.importFile.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    changeFile(e) {
        console.log(e.target.files[0]);
        this.setState({imageFile: e.target.files[0]});
    }

    importFile() {
        var data = new FormData();
        var loginId = sessionStorage.getItem('loginId');
        var loginPw = sessionStorage.getItem('loginPw');

        data.append('image', this.state.imageFile);
        data.append('user', loginId);
        data.append('password', loginPw);
        data.append('postId', '1');

        // $.ajax({
        //     type: "POST",
        //     url: "http://127.0.0.1:8000/upImage/",
        //     data: data,
        //     dataType: "JSON"
        // }).done(function(json){
        //     alert("hooray!");
        // });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://127.0.0.1:8000/upImage/', data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getImage = async () => {
        var data = new FormData();
        var img;
        data.append('postId', '24');

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
            <img src={imgPath} />
        );
        return(
            <div>
                임시 작업용 페이지
                <input type="file" onChange={this.changeFile}/>
                <button onClick={this.importFile}>Import</button>
                <hr />
                <button onClick={this.getImage}>getImageTest</button>
                {imgInstance}
            </div>
        );
    }
};

export default Link2;