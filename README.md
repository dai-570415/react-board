# White board App

## Data download & construction

```bash
$ git clone https://github.com/dai-570415/react-board.git

$ cd react-board

$ npm install

$ npm start
```

- Setting(Firebase.js)

```js
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "Your_Key",
    authDomain: "Your_Key",
    databaseURL: "Your_Key",
    projectId: "Your_Key",
    storageBucket: "Your_Key",
    messagingSenderId: "Your_Key",
    appId: "Your_Key",
    measurementId: "Your_Key"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```


以下のコードからcreate-react-app上にデータを作り変え、改良させました。

cf. 元コード(ミニマムなReact)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>StayHomeBoard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-database.js"></script>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script type="text/babel">
      var firebaseConfig = {
        apiKey: "Your_Key",
        authDomain: "Your_Key",
        databaseURL: "Your_Key",
        projectId: "Your_Key",
        storageBucket: "Your_Key",
        messagingSenderId: "Your_Key",
        appId: "Your_Key",
        measurementId: "Your_Key"
      };
      const firebaseApp = firebase.initializeApp(firebaseConfig);


      const firebaseDb = firebaseApp.database();
      let db = null;

      const Board = () => {

        React.useEffect(() => {
          const params = new URL(document.location).searchParams;
          let roomName = params.get("room_name");
          if (!roomName) {
            let roomName = window.prompt("please input room's name");
            window.location.href = window.location.href + "?room_name=" + roomName;
          }
          db = firebaseDb.ref(roomName);
          db.on("value", (value) => setCards(value.val()));
        }, []);

        const [cards, setCards] = React.useState(null);
        const add = () => {
          const newPostKey = db.push().key;
          db.update({
            [newPostKey]: {
              t: "wash",
              x: Math.floor(Math.random() * (200 - 80) + 80),
              y: Math.floor(Math.random() * (200 - 80) + 80),
            },
          });
        };
        const update = (key, card) => db.update({ [key]: card });
        const remove = (key) => db.child(key).remove();

        const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });

        const [editMode, setEditMode] = React.useState({ key: "" });
        const [input, setInput] = React.useState("");

        if (!cards) return <button onClick={() => add()}>add card</button>;
        return (
          <div
            style={{ width: "1000px", height: "1000px", position: "relative" }}
            onDrop={(e) => {
              if (!dragging || !cards) return;
              update(dragging.key, { ...cards[dragging.key], x: e.clientX - dragging.x, y: e.clientY - dragging.y });
            }}
            onDragOver={(e) => e.preventDefault()} // enable onDrop event
          >
            <button onClick={() => add()}>add card</button>
            {Object.keys(cards).map((key) => (
              <div
                key={key}
                style={{ position: "absolute", top: cards[key].y + "px", left: cards[key].x + "px" }}
                draggable={true}
                onDragStart={(e) => setDragging({ key, x: e.clientX - cards[key].x, y: e.clientY - cards[key].y })}
              >
                {editMode.key === key ? (
                  <textarea
                    onBlur={(e) => {
                      update(key, { ...cards[key], t: input });
                      setEditMode({ key: "" });
                      setInput("");
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    defaultValue={cards[key].t}
                  />
                ) : (
                  <div onClick={(e) => setEditMode({ key })}>{cards[key].t}</div>
                )}
                <button onClick={() => remove(key)}>x</button>
              </div>
            ))}
          </div>
        );
      };
      ReactDOM.render(<Board />, document.getElementById("root"));
    </script>
  </head>
  <body>
    <div id="root" />
  </body>
</html>
```