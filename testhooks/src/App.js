import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import useRequest from './useRequest';

function App() {
  const [response, loading, error] = useRequest(
    'http://127.0.0.1:8000/photos/'
  );
  const [no, setNo] = useState(0);
  
  const [response2] = useRequest(
    'http://127.0.0.1:8000/images/'
  );
  // console.log(response)
  // console.log(response2)
  
  if (loading) {
    return <div>로딩중..</div>;
  }

  if (error) {
    return <div>에러 발생!</div>;
  }

  if (!response) return null;

  const { title, content } = response.data[no];

  let image = ''
  if(response2 !== null){
    for (let i = 0; i < response2.data.length; i++) {
      if (response2.data[i].photoId === response.data[no].id) {
        image = response2.data[i].image;
      }
    }
  }
  console.log('path:' + image);

  function click(op) {
    if (op === '+') {
      if (no + 1 < response.data.length) {
        setNo(no + 1);
      } else {
        console.log('Max range');
      }
    } else if (op === '-') {
      if (no - 1 >= 0) {
        setNo(no - 1);
      } else {
        console.log('Min range');
      }
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => click('-')}>
        -
      </button>
      <button onClick={() => click('+')}>
        +
      </button>
      <img src={'http://127.0.0.1:8000/media/photo/' + image}></img>
    </div>
  );
}

export default App;
