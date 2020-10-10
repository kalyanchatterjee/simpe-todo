import React, { Component } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import TodoCount from "./components/TodoCount";

class App extends Component {
  constructor() {
    super();
    let map = new Map();
    this.state = {
      todos: [],
      showCompleted: false,
      priority: "",
      text: "",
      formErrors: {
        priority: "",
        text: "",
      },
      counts: map,
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.incrementCount = this.incrementCount.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  // Please note: I got stuck here for a long time - the handleChange event was firing twice!
  // Solved using SO: https://stackoverflow.com/questions/53480107/react-js-onchange-triggering-twice/62720320#62720320

  // Mark a task complete
  handleCheckChange(id) {
    this.setState((prevState) => {
      let map = new Map();
      const updatedTodos = prevState.todos.map((item) => {
        if (item.id === id) {
          if (item.completed) {
            map = this.incrementCount(id);
          } else {
            map = this.decrementCount(id);
          }
          item.completed = !item.completed;
        }
        return item;
      });
      return {
        todos: updatedTodos,
        counts: map,
      };
    });
  }

  // delete a task
  handleDelete(id) {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation === true) {
      let map = this.decrementCount(id);
      this.setState((prevState) => {
        return {
          todos: prevState.todos.filter((item) => item.id !== id),
          count: map,
        };
      });
    }
  }

  // "Show Completed" toggle
  showCompleted() {
    this.setState((prevState) => {
      return {
        showCompleted: !prevState.showCompleted,
      };
    });
  }

  // Decrement the count of tasks for each priority
  decrementCount(task_id) {
    let map = this.state.counts;
    let todo = this.state.todos.filter((item) => item.id === task_id)[0];
    let priority = todo.priority;
    if (map.has(priority)) {
      let newCount = map.get(priority) - 1;
      if (newCount === 0) {
        map.delete(priority);
      } else {
        map.set(priority, newCount);
      }
    }
    // this.setState(() => {
    //   return { counts: map };
    // });
    return map;
  }
  // Increment the count of tasks for each priority - that's when a task marked done is marked undone
  incrementCount(task_id) {
    let map = this.state.counts;
    let todo = this.state.todos.filter((item) => item.id === task_id)[0];
    let priority = todo.priority;
    if (map.has(priority)) {
      map.set(priority, map.get(priority) + 1);
    } else {
      map.set(priority, 1);
    }
    // this.setState({
    //   counts: map,
    // });
    return map;
  }

  // onChange event handler for Priority and Text inputs
  handleTextChange(event) {
    event.preventDefault();
    let formErrors = this.state.formErrors;
    const { name, value } = event.target;
    switch (name) {
      case "priority":
        formErrors.priority =
          value < 1 || value > Number.MAX_SAFE_INTEGER
            ? "Priority must be greater than 0."
            : "";
        break;
      case "text":
        formErrors.text =
          value.length < 3 || value.length > 250
            ? "Task description must be between 3 characters and 250 characters long."
            : "";
        break;
      default:
        break;
    }

    this.setState(
      {
        [event.target.name]: event.target.value,
        formErrors,
      }
      // () => console.log(this.state)
    );
  }

  handleAddTask(event) {
    event.preventDefault();

    let valid = true;
    let formErrors = this.state.formErrors;
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });

    if (valid) {
      if (this.state.priority < 1 || this.state.text.length < 3) {
        valid = false;
        this.setState({
          formErrors: {
            text:
              "Task description must be between 3 characters and 250 characters long.",
            priority: "Priority must be greater than 0.",
          },
        });
      }
    }

    if (valid) {
      const newTask = {
        id: parseInt(Date.now()),
        priority: this.state.priority,
        text: this.state.text,
        completed: false,
      };
      let tasks = [...this.state.todos];
      let map = this.state.counts;
      if (map.has(newTask.priority)) {
        map.set(newTask.priority, map.get(newTask.priority) + 1);
      } else {
        map.set(newTask.priority, 1);
      }
      tasks.push(newTask);

      this.setState({
        todos: tasks,
        priority: "",
        text: "",
        counts: map,
      });

      // console.log(this.state.counts);
    }
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

    // Create an array of TodoCount components
    const todoCounts = [];
    for (const [key, value] of this.state.counts.entries()) {
      todoCounts.push(<TodoCount key={key} priority={key} count={value} />);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h4>Simple TODO App</h4>
        </header>
        <TodoForm
          onTextChange={this.handleTextChange}
          onAddTask={this.handleAddTask}
          text={this.state.text}
          priority={this.state.priority}
          priorityError={this.state.formErrors.priority}
          textError={this.state.formErrors.text}
        />
        {todoCounts}
        <hr></hr>
        <input
          type="checkbox"
          checked={this.state.showCompleted}
          onChange={this.showCompleted}
        />
        <label>&nbsp;Show Completed</label>
        {todoItems}
      </div>
    );
  }
}

export default App;
