import React from "react";

function TodoItem(props) {
  const styles = {
    marginTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #e0e0e0f1",
  };
  return (
    <div style={styles}>
      <h4>Priorty: {props.item.priority}</h4>
      <input
        type="checkbox"
        checked={props.item.completed}
        onChange={() => props.handleChange(props.item.id)}
      />
      <label>&nbsp;{props.item.text}</label>
      <br />
      <button
        className="btn btn-danger btn-sm"
        style={{ marginLeft: 10 }}
        onClick={() => props.handleDelete(props.item.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
