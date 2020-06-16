import React, { memo } from "react";

const Footer = memo((props) => {
  const { status, setStatusFilter, numOfTodoLeft, numOfTodos,clearCompleted } = props;
  const filterBtns = [
    {
      title: "All",
      isActived: status === "ALL",
      onClick: () => setStatusFilter("ALL"),
      link: "#",
    },
    {
      title: "Active",
      isActived: status === "ACTIVE",
      onClick: () => setStatusFilter("ACTIVE"),
      link: "#",
    },
    {
      title: "Completed",
      isActived: status === "COMPLETED",
      onClick: () => setStatusFilter("COMPLETED"),
      link: "#",
    },
  ];
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong> {numOfTodoLeft} </strong> <span> </span>{" "}
        <span> {numOfTodoLeft <= 1 ? "item" : "items"} </span>{" "}
        <span> left </span>{" "}
      </span>
      <ul className="filters">
        {filterBtns.map((item) => {
          return <FilterBtn {...item} />;
        })}
      </ul>
      {numOfTodos > numOfTodoLeft && (
        <button onClick={clearCompleted} className="clear-completed">Clear Completed</button>
      )}
    </footer>
  );
});

const FilterBtn = memo((props) => {
  const { title, isActived, link, onClick } = props;
  return (
    <>
      <li>
        <a
          href={link}
          className={`${isActived ? "selected" : ""}`}
          onClick={onClick}
        >
          {title}
        </a>
      </li>
    </>
  );
});

export default Footer;
