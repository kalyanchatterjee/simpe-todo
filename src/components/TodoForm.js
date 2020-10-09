import React, { Component } from "react";

class TodoForm extends Component {
  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <h3>Add New Task</h3>
        <div>
          <label>Priority: </label>
          <input
            type="text"
            pattern="[0-9]*"
            name="priority"
            style={{ width: "300px", marginBottom: 5 }}
            placeholder="Priority. E.g. 1, 2, 3 etc."
            onChange={this.props.onTextChange}
          ></input>
        </div>
        <div>
          <label>Task Description: </label>
          <input
            type="text"
            name="text"
            style={{ width: "300px" }}
            value={this.props.text}
            placeholder="E.g. Grocery shopping"
            onChange={this.props.onTextChange}
          ></input>
        </div>
        <br />
        <button onClick={this.props.onAddTask}>Add Task</button>
      </div>
    );
  }
}

export default TodoForm;
