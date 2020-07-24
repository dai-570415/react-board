import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import PostIcon from '../assets/img/post_blk.png';
import HowToImage1 from '../assets/img/howto1.png';
import HowToImage2 from '../assets/img/howto2.png';
import HowToImage3 from '../assets/img/howto3.png';

const Index = () => {
  const [input, setInput] = useState('');

  // 共通ボード
  const socialUrl = '/board?room_name=Social'; 
  // 入力値
  const url = `/board?room_name=${input}`; 

  return (
    <>
      <div className="top">
        <h1><img src={Logo} alt="white board" /></h1>
        <div className="form">
          <Link className="link" to={socialUrl}>試しにつかってみる</Link>
          <p className="or">or</p>
          <input className="input" placeholder="スペース名を入力..." onChange={(e) => setInput(e.target.value)} />
          <Link className="link-button" to={url}><img src={PostIcon} alt="スペース名を入力..." /></Link>
        </div>
      </div>
      <div className="description">
        <h3>White Board<span>とは？</span></h3>
        <p>リアルタイムで付箋のようなコメントを投稿することが</p>
        <p>できるアプリです。カラーも適宜変更可能です。</p>
      </div>

      <div className="howto">
        <h3>HOW TO USE<span>サービスの使い方</span></h3>
        <h4>リアルタイムボードWhite Boardの使い方</h4>
        <div className="howto-items">
          <div className="howto-item">
            <img src={HowToImage1} alt="スペース名を入力" />
            <h5>スペース名を入力</h5>
            <p>好きなスペース名を入力ください。次回以降、同じスペース名を入力すると、同じ編集スペースにに移動できます。</p>
          </div>
          <div className="howto-item">
            <img src={HowToImage2} alt="ボードを新規追加" />
            <h5>ボードを新規追加</h5>
            <p>新しくコメント投稿する際はページ左上のボタンをクリックするとボードが新たに追加されます。</p>
          </div>
          <div className="howto-item">
            <img src={HowToImage3} alt="コメント編集" />
            <h5>コメント編集</h5>
            <p>コメント部分をクリックするとテキストが編集可能です。また好きな色を選択することができます。</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
