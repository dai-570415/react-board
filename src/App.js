import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import BoardIndex from './components/board/Index';
import './assets/css/App.css';

// head情報
const title = 'White board';
const description = 'このアプリはリアルタイムで書けるホワイトボードアプリです。';
document.title = title;
const headData = document.head.children;
for (let i = 0; i < headData.length; i++) {
    const nameVal = headData[i].getAttribute('name');
    if (nameVal !== null) {
        if (nameVal.indexOf('description') !== -1) {
            headData[i].setAttribute('content', description);
        }
        // OGP(twitter)の設定
        if (nameVal.indexOf('twitter:title') !== -1) {
            headData[i].setAttribute('content', title);
        }
        if (nameVal.indexOf('twitter:description') !== -1) {
            headData[i].setAttribute('content', description);
        }
    }
}
// ここまでhead情報

const App = () => {
  return (
    <div className="container">
      <Router>
        <main>
          <Switch>
            <Route exact path="/" component={ Index } />
            <Route exact path="/board" component={ BoardIndex } />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
