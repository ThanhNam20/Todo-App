import React, { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Header = memo((props) => {
  const [text, setText] = useState(" "); //Khoi tao gia tri ban dau cho State
  const { addTodo,isCheckAll } = props;
  const onAddTodo = (e = {}) => {
    if (e.key === "Enter" && text) {
      addTodo({
        id: uuidv4(),
        text,
        isCompleted: false,
      });
      setText('') // Set input ve rong 
    }
  };
  return (
    <header className="header">
      <h1>Todos</h1>
      <input
        className="new-todo"
        
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          onAddTodo(e)
        }}
        checked={isCheckAll}
      />
    </header>
  );
});

export default Header;
