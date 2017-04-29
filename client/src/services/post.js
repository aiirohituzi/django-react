import axios from 'axios';

export function getPost(postId) {
    return axios.get('http://127.0.0.1:8000/posting/' + postId);
}

// axios.get('http://127.0.0.1:8000/posting/1/', {
//     headers: { Authorization: 'Basic YWRtaW46YXNkZjEyMzQ=' }
// })
// .then(function (response) {
//     console.log(response);
//     console.log(response.data);
// })
// .catch(function (error) {
//     console.log(error);
// });