import React from 'react';

class Link2 extends React.Component{
    changeFile(e) {
            this.setState({csvFile: e.target.files[0]});
        }

    importFilen() {
            data = new FormData();
            data.append('file', this.state.csvFile);
            $.ajax({
                type: "POST",
                url: "/csv/import",
                data: data,
                dataType: "JSON"
            }).done(function(json){
                alert("hooray!");
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