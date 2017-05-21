import axios from 'axios';

export function getPostId(postId) {
    return axios.get('http://127.0.0.1:8000/posting/' + postId);
}

export function getPost() {
    return axios.get('http://127.0.0.1:8000/posting/');
}

// export function deletePost(postId, user, password) {
//     return axios.post('http://127.0.0.1:8000/delete/', {
//         postId: postId,
//         user: user,
//         password: password
//     })
//     .then(function (response) {
//         // console.log(response.data);
//     })
//     .catch(function (error) {
//         // console.log(error);
//     });
// }