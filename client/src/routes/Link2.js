import React from 'react';
import axios from 'axios';

class Link2 extends React.Component{
    constructor(props) {
        super(props);

        this.changeFile = this.changeFile.bind(this);
        this.importFile = this.importFile.bind(this);
    }

    changeFile(e) {
        console.log(e.target.files[0]);
        this.setState({csvFile: e.target.files[0]});
    }

    importFile() {
        var data = new FormData();
        data.append('file', this.state.csvFile);
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

    render() {
        return(
            <div>
                임시 작업용 페이지
                <input type="file" onChange={this.changeFile}/>
                <button onClick={this.importFile}>Import</button>
            </div>
        );
    }
};

export default Link2;