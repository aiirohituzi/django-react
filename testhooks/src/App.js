import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import useRequest from './useRequest';

function App() {
  const [responsePt, loadingPt, errorPt] = useRequest(
    'http://127.0.0.1:8000/photos/'
  );
  const [no, setNo] = useState(0);
  
  const [responseImg, loadingImg, errorImg] = useRequest(
    'http://127.0.0.1:8000/images/'
  );
  
  if (loadingPt || loadingImg) {
    return <div>로딩중..</div>;
  }

  if (errorPt || errorImg) {
    return <div>에러 발생!</div>;
  }

  if (!responsePt) return null;

  const { title, content } = responsePt.data[no];

  let image = []
  if(responseImg !== null){
    for (let i = 0; i < responseImg.data.length; i++) {
      if (responseImg.data[i].photoId === responsePt.data[no].id) {
        image.push(responseImg.data[i].image);
        console.log('path:' + image);
      }
    }
  }

  function click(op) {
    if (op === '+') {
      if (no + 1 < responsePt.data.length) {
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

  const imgInstance = []
  for (let item of image) {
    imgInstance.push(
      <img src={'http://127.0.0.1:8000/media/photo/' + item}></img>
    );
    console.log(item)
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
      <p>{imgInstance}</p>
    </div>
  );
}

export default App;
