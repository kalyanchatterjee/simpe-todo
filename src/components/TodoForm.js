import React, { Component } from "react";

class TodoForm extends Component {
  render() {
    let error1;
    let error2;
    if (this.props.priorityError !== "") {
      error1 = (
        <p
          className="alert alert-danger"
          role="alert"
          style={{ marginTop: 5, fontSize: "80%" }}
        >
          {this.props.priorityError}
        </p>
      );
    }
    if (this.props.textError !== "") {
      error2 = (
        <p
          className="alert alert-danger"
          role="alert"
          style={{ marginTop: 5, fontSize: "80%" }}
        >
          {this.props.textError}
        </p>
      );
    }

    return (
      <form style={{ marginBottom: 20 }} onSubmit={this.props.onAddTask}>
        <div>
          <label>Priority: </label>
          <br />
          <input
            type="text"
            pattern="[1-9]*"
            name="priority"
            style={{ width: "300px", marginBottom: 5 }}
            value={this.props.priority}
            placeholder="Priority. E.g. 1, 2, 3 etc."
            onChange={this.props.onTextChange}
          ></input>
        </div>
        <div>
          <label>Task Description: </label>
          <br />
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
        <input
          type="submit"
          value="Add Task"
          className="btn btn-primary btn-sm"
        ></input>
        {error1}
        {error2}
      </form>
    );
  }
}

export default TodoForm;
