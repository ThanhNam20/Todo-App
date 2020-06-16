import React, { memo } from "react";
import Todo from "./Todo";

const TodoList = memo((props) => {
  const { todoList,isCheckAll,checkAllTodos } = props;
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" checked={isCheckAll} />
      <label htmlFor="toggle-all" onClick= {checkAllTodos} ></label>
      <ul className="todo-list">
        {todoList.map((todo, index) => (
          <Todo
            key={todo.id}
            {...{ todo }}
            {...props} // Nhan all props tu App.js truywn sang Todo
            index={index} 
          />
        ))}
      </ul>
    </section>
  );
});

export default TodoList;
