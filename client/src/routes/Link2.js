import React from 'react';
import axios from 'axios';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

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

    getImage() {
        var data = new FormData();
        data.append('postId', '24');

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        axios.post('http://127.0.0.1:8000/images/', data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                임시 작업용 페이지
                <input type="file" onChange={this.changeFile}/>
                <button onClick={this.importFile}>Import</button>
                <hr />
                <button onClick={this.getImage}>getImageTest</button>
            </div>
        );
    }
};

export default Link2;