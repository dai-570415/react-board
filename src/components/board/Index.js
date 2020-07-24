import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import createButtonIcon from '../../assets/img/add-icon.png';
import deleteButtonIcon from '../../assets/img/delete-icon.png';
import BackIcon from '../../assets/img/back-icon.png';

const firebaseDb = firebase.database();
let db = null;
const CORLORS = ['#fff', '#FFD86F', '#7EE1FF', '#B4DEB6', '#EBCBD6'];

const Index = () => {
  const [cards, setCards] = useState(null);
  const [dragging, setDragging] = useState({ key: '', x: 0, y: 0 });
  const [editMode, setEditMode] = useState({ key: '' });
  const [input, setInput] = useState('');

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    
    let roomName = params.get('room_name');
    if (!roomName) {
      // let roomName = window.prompt('ルームネームを入れてください');
      // window.location.href = window.location.href + '?room_name=' + roomName;

      // 入力値がない場合ルートURLに遷移
      window.location.href= 'https://react-whiteboard-200521.firebaseapp.com/';
    }
    db = firebaseDb.ref(roomName);
    db.on('value', (value) => setCards(value.val()));
  }, []);

  // add
  const add = () => {
    const newPostKey = db.push().key;
    db.update({
      [newPostKey]: {
        c: 0, // CORLORS配列の5番目#fffを格納
        t: '入力してください',
        x: Math.floor(Math.random() * (200 - 80) + 80),
        y: Math.floor(Math.random() * (200 - 80) + 80),
      },
    });
  };
  // update
  const update = (key, card) => db.update({ [key]: card });
  // remove
  const remove = (key) => db.child(key).remove();

  // cardsが1個も存在してなかったら
  if (!cards) return (
    <div>
      <img className="create-button" onClick={() => add()} src={ createButtonIcon } alt="カードを追加" />
      <Link className="back-link" to="/"><img src={BackIcon} alt="TOPに戻る" /></Link>
    </div>
  );

  return (
    <>
      <div
        className="white-board"
        onDrop={(e) => {
          if (!dragging || !cards) return;
          update(dragging.key, { ...cards[dragging.key], x: e.clientX - dragging.x, y: e.clientY - dragging.y });
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <img className="create-button" onClick={() => add()} src={ createButtonIcon } alt="カードを追加" />
        {Object.keys(cards).map((key) => (
          <div
            className="board-item"
            key={key}
            style={{ background: CORLORS[cards[key].c], position: 'absolute', top: cards[key].y + 'px', left: cards[key].x + 'px' }}
            draggable={true}
            onDragStart={(e) => setDragging({ key, x: e.clientX - cards[key].x, y: e.clientY - cards[key].y })}
          >
            <div className="board-item-top">
              <img className="delete-icon" onClick={() => remove(key)} src={ deleteButtonIcon } alt="カードを追加" />
            </div>
            <div className="ColorSelector">
              {CORLORS.map((c, i) => (
                <div
                  key={c}
                  className="ColorCircle"
                  onClick={() => {
                    update(key, { ...cards[key], c: i });
                  }}
                  style={{ background: c }}
                />
              ))}
            </div>
            {editMode.key === key ? (
              <textarea
                className="board-textarea"
                onBlur={(e) => {
                  update(key, { ...cards[key], t: input });
                  setEditMode({ key: '' });
                  setInput('');
                }}
                onChange={(e) => setInput(e.target.value)}
                defaultValue={cards[key].t}
              />
            ) : (
              <div onClick={(e) => setEditMode({ key })}>{cards[key].t}</div>
            )}
          </div>
        ))}
        <Link className="back-link" to="/"><img src={BackIcon} alt="TOPに戻る" /></Link>
      </div>
    </>
  );
}

export default Index;
