import React from 'react';
import axios from 'axios';

const Link1 = () => {
    axios.get('http://127.0.0.1:8000/posting/1/', {
        headers: { Authorization: 'Basic YWRtaW46YXNkZjEyMzQ=' }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    return (
        <div>
            Link1
        </div>
    );
};

export default Link1;