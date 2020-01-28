import React, { useRef, useState } from "react";
import HighlightChange from "react-change-highlight";

function App() {
  const inputRef = useRef();
  const [listOfTodos, setListOfTodos] = useState([]);

  const handleAddTodo = () => {
    if (!inputRef.current.value) return;
    const list = [...listOfTodos];
    list.push(inputRef.current.value);
    setListOfTodos(list);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div style={{ margin: "50px 100px" }}>
      <input
        ref={inputRef}
        onKeyDown={e => {
          if (e.keyCode === 13) handleAddTodo();
        }}
      />
      <button onClick={handleAddTodo}>Add</button>
      <br />
      <HighlightChange>
        {listOfTodos.map((todo, idx) => (
          <div key={todo + idx} style={{ paddingTop: "10px" }} ref={React.createRef()}>
            <input type="checkbox" />
            {todo}
          </div>
        ))}
      </HighlightChange>
    </div>
  );
}

export default App;
