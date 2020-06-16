import React, { memo, useState } from "react";

const Todo = memo((props) => {
  const {
    todo,
    todoEditingId,
    getTodoEditingId,
    onEditTodo,
    index,
    markCompleted,
    onRemoveTodo
  } = props;

  const isEditing = todoEditingId === todo.id;
  const [text, setText] = useState(todo.text);

  const editTodo = () => {
    onEditTodo(
      {
        ...todo,
        text,
      },
      index
    );
  };
  return (
    <li
      key={todo.id}
      className={`${isEditing ? "editing" : ""} ${
        todo.isCompleted ? "completed" : ""
      } `}
    >
      {!isEditing ? ( // neu dang ko edit
        <div key={todo.id} className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => markCompleted(todo.id)}
          />
          <label onDoubleClick={() => getTodoEditingId(todo.id)}>
            {todo.text}
          </label>
          <button onClick={()=>onRemoveTodo(todo.id)}  className="destroy"></button>
        </div>
      ) : (
        //Neu dang edit
        <input
          type="text"
          className="edit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={editTodo}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              editTodo();
            }
          }}
        />
      )}
    </li>
  );
});

export default Todo;
