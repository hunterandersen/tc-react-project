import { useState } from "react";

export default function HomePage(props) {

  const [list, setList] = useState(["ready", "set", "GO"]);
  const [text, setText] = useState();

  function onSubmit(event) {
    event.preventDefault();

    setList([...list, text]);
  }

  return (
    <div>
      <h1>Hello World</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {/* This is where FilmsList was previously */}
    </div>
  );
}
