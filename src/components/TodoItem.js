import React from "react";

function TodoItem(props) {
  const styles = {
    marginTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #e0e0e0f1",
  };
  return (
    <div style={styles}>
      <h2>Priorty: {props.item.priority}</h2>
      <input
        type="checkbox"
        checked={props.item.completed}
        onChange={() => props.handleChange(props.item.id)}
      />
      <label> {props.item.text}</label>
      <button
        style={{ marginLeft: 10, color: "red" }}
        onClick={() => props.handleDelete(props.item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
