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

  const { id, title, content, created } = responsePt.data[no];



  const contentInstance = [];
  const ytbInstance = [];
  let temp_content = [];

  let regExp = /(https?:\/\/www.youtube.com\/watch\?v=[^#\&\?\n]{11,11})|(https?:\/\/youtu.be\/[^#\&\?\n]{11,11})/
  let regExp2 = /((https?:\/\/www.youtube.com\/watch\?v=)([^#\&\?]{11,11}))|((https?:\/\/youtu.be\/)([^#\&\?]{11,11}))/
  let split_content = content.split(regExp)

  for(let i = 0; i < split_content.length; i++){
    if(regExp.test(split_content[i])){
      let match = split_content[i].match(regExp2)
      if(match){
        let id

        if(match[3]){
          id = match[3]
        } else if(match[6]){
          id = match[6]
        }

        temp_content.push(split_content[i])
        
        ytbInstance.push(
          <p>
            <iframe frameBorder='no' src={'http://www.youtube.com/embed/' + id}></iframe>
          </p>
        );
        ytbInstance.push(
          <p>
            <a href={match[0]} target='_blank'><font size='1' color='gray'>{match[0]}</font></a>
          </p>
        );
      }
    } else if(split_content[i] !== undefined) {
      temp_content.push(split_content[i])
    }
    if(i === split_content.length - 1){
      if(temp_content.length !== 0){
        contentInstance.push(temp_content)
      }
      contentInstance.push(ytbInstance)
    }
  }



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
    <div class="container">
      <h1>{title}</h1>
      <p id="created">작성일시: {created.split('.')[0]}</p>
      <p>{imgInstance}</p>
      <p>{contentInstance}</p>
      <button onClick={() => click('-')}>
        &lt;&lt; 이전
      </button>
      <span id="currentId">{id}</span>
      <button onClick={() => click('+')}>
        다음 &gt;&gt;
      </button>
    </div>
  );
}

export default App;
