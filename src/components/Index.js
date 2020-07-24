import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import PostIcon from '../assets/img/post_blk.png';

const Index = () => {
  const [input, setInput] = useState('');

  // 共通ボード
  const socialUrl = '/board?room_name=Social'; 
  // 入力値
  const url = `/board?room_name=${input}`; 

  return (
    <>  
      <h1><img src={Logo} alt="white board" /></h1>
      <div className="form">
        <Link className="link" to={socialUrl}>試しにつかってみる</Link>
        <p className="or">or</p>
        <input className="input" placeholder="スペース名を入力..." onChange={(e) => setInput(e.target.value)} />
        <Link className="link-button" to={url}><img src={PostIcon} alt="スペース名を入力..." /></Link>
      </div>
    </>
  );
}

export default Index;
