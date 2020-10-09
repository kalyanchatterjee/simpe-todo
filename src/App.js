import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import SampleTodos from "./data/SampleTodos";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: SampleTodos,
      showCompleted: false,
      priority: 0,
      text: "",
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  // Please note: I got stuck here for a long time - the handleChange event was firing twice!
  // Solved using SO: https://stackoverflow.com/questions/53480107/react-js-onchange-triggering-twice/62720320#62720320

  handleCheckChange(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
          // console.log(item.completed);
        }
        return item;
      });
      return {
        todos: updatedTodos,
      };
    });
  }

  handleDelete(id) {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation === true) {
      this.setState((prevState) => {
        return {
          todos: prevState.todos.filter((item) => item.id !== id),
        };
      });
    }
  }

  showCompleted() {
    this.setState((prevState) => {
      return {
        showCompleted: !prevState.showCompleted,
      };
    });
  }

  handleTextChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleAddTask() {
    const newTask = {
      id: this.state.text,
      priority: this.state.priority,
      text: this.state.text,
      completed: false,
    };

    let tasks = [...this.state.todos];
    tasks.push(newTask);

    this.setState({
      todos: tasks,
    });
  }

  render() {
    const todosByStatus = this.state.todos.filter((item) => {
      return item.completed === this.state.showCompleted;
    });

    // Sort by priority
    const todosSortedByPriority = todosByStatus.sort(
      (a, b) => parseInt(a.priority) - parseInt(b.priority)
    );

    // Create an array of components to render
    const todoItems = todosSortedByPriority.map((item) => (
      <TodoItem
        key={item.id}
        item={item}
        handleChange={this.handleCheckChange}
        handleDelete={this.handleDelete}
      />
    ));
    return (
      <div className="App">
        <header className="App-header">
          <h1>My TODO List</h1>
        </header>
        <TodoForm
          onTextChange={this.handleTextChange}
          onAddTask={this.handleAddTask}
          text={this.state.text}
          priority={this.state.priority}
        />
        <hr></hr>
        <input
          type="checkbox"
          checked={this.state.showCompleted}
          onChange={this.showCompleted}
        />
        <label> Show Completed</label>
        {todoItems}
      </div>
    );
  }
}

export default App;
