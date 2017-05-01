import axios from 'axios';

export function getPostId(postId) {
    return axios.get('http://127.0.0.1:8000/posting/' + postId);
}

export function getPost() {
    return axios.get('http://127.0.0.1:8000/posting/');
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