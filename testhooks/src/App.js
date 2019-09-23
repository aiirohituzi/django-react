import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import useRequest from './useRequest';

function App() {
  const [response, loading, error] = useRequest(
    'http://127.0.0.1:8000/posting/'
  );
  const [no, setNo] = useState(0);
  
  if (loading) {
    return <div>로딩중..</div>;
  }

  if (error) {
    return <div>에러 발생!</div>;
  }

  if (!response) return null;

  const { id, title, content } = response.data[no];

  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
      <p>{content}</p>
      <button onClick={() => setNo(no - 1)}>
        -
      </button>
      <button onClick={() => setNo(no + 1)}>
        +
      </button>
    </div>
  );
}

export default App;
