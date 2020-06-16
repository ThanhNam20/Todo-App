import React, { Component } from "react";
//Components
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
//css
import "./App.css";
import "./todos.css";

const isNotCheckAll = (todos = []) => {
  todos.find(todo=>!todo.isCompleted)
}
const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo=> todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos;
  }
}

class App extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        text: "Todo",
        isCompleted: true,
      },
      {
        id: uuidv4(),
        text: "Todo222",
        isCompleted: false,
      },
    ],
    todoEditingId: "",
    isCheckAll: false,
    status: "ALL",
  };

  componentWillMount() {
    this.setState({
      isCheckAll: isNotCheckAll(this.state.todoList),
    });
  }

  addTodo = (todo = {}) => {
    this.setState((preState) => ({
      todoList: [...preState.todoList, todo],
    }));
  };

  getTodoEditingId = (id = "") => {
    this.setState({ todoEditingId: id });
  };

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todoList: list } = this.state;
      list.splice(index, 1, todo);
      this.setState({ todoList: list, todoEditingId: "" });
    }
  };

  markCompleted = (id = "") => {
    const { todoList } = this.state;
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState((preState) => ({
      todoList: updatedList,
      isCheckAll: !isNotCheckAll(updatedList),
    }));
  };

  checkAllTodos = () => {
    const { todoList, isCheckAll } = this.state;
    this.setState((preState) => ({
      todoList: todoList.map((todo) => ({ ...todo, isCompleted: !isCheckAll })),
      isCheckAll: !preState.isCheckAll,
    }));
  };

  setStatusFilter = (status = " ") => {
    this.setState({
      status,
    });
  };

  clearCompleted = () => {
    const { todoList } = this.state;
    this.setState({
      todoList: filterByStatus(todoList, "ACTIVE"),
    });
  };

  onRemoveTodo = (id = '') => {
    const { todoList } = this.state;
    this.setState({
      todoList: filterByStatus(todoList,'REMOVE',id)
    })
  }

  render() {
    const { todoList, todoEditingId, isCheckAll, status } = this.state;
    return (
      <div className="todoapp">
        <Header addTodo={this.addTodo} isCheckAll={isCheckAll} />
        <TodoList
          todoList={filterByStatus(todoList, status)}
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={todoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckAll={isCheckAll}
          checkAllTodos={this.checkAllTodos}
          onRemoveTodo={this.onRemoveTodo}
        />
        <Footer
          setStatusFilter={this.setStatusFilter}
          clearCompleted={this.clearCompleted}
          numOfTodos={todoList.length}
          numOfTodoLeft={filterByStatus(todoList, "ACTIVE").length}
          status={status}
        />
      </div>
    );
  }
}

export default App;
