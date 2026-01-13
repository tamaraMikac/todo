import React, { Component } from "react";
import { useParams } from "react-router-dom";

function withParams(Wrapped) {
  return function (props) {
    const params = useParams();
    return <Wrapped {...props} params={params} />;
  };
}

class TasksView extends Component {
  state = {
    newTask: "",
    tasks: [],
  };

  componentDidMount() {
    this.fetchTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.listId !== this.props.params.listId) {
      this.fetchTasks();
    }
  }

  fetchTasks = () => {
    const { listId } = this.props.params;

    fetch(`http://localhost:5013/tasks?listId=${listId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => this.setState({ tasks: data }))
      .catch((err) => console.error(err));
  };

  handleAddTask = () => {
    const { listId } = this.props.params;

    if (!this.state.newTask.trim()) return;

    fetch("http://localhost:5013/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: this.state.newTask,
        description: "",
        due_date: null,
        priority: "normal",
        status: false,
        list_id: Number(listId), // ⬅️ KLJUČNO
      }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        this.setState({
          tasks: [...this.state.tasks, newTask],
          newTask: "",
        });
      })
      .catch((err) => console.error(err));
  };

  toggleDone = (task) => {
    fetch(`http://localhost:5013/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: !task.status }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        this.setState({
          tasks: this.state.tasks.map((t) =>
            t.id === updatedTask.id ? updatedTask : t
          ),
        });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg"
          style={{
            background: "linear-gradient(to right, #ffbfd4, #ffcfe1)",
            padding: "12px 25px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <span
            className="navbar-brand fw-bold"
            style={{ color: "#a14c6c", fontSize: "1.5rem" }}
          >
            🌸 To-do
          </span>
        </nav>

        <div className="min-vh-100 d-flex flex-column align-items-center pt-5">
          <div style={{ fontSize: "5rem", marginBottom: "10px" }}>🌸</div>

          <button
            className="btn"
            onClick={this.handleAddTask}
            style={{
              backgroundColor: "#fffa",
              padding: "8px 20px",
              borderRadius: "20px",
              fontWeight: "bold",
              boxShadow: "0px 2px 8px rgba(255,182,193,0.6)",
              color: "#a14c6c",
            }}
          >
            Add new task
          </button>

          <input
            type="text"
            className="form-control mt-4"
            placeholder="New task..."
            value={this.state.newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
            style={{
              backgroundColor: "pink",
              width: 650,
              height: 40,
              boxShadow: "1px 5px 10px rgba(255,182,193,0.6)",
              color: "#a14c6c",
            }}
          />

          {this.state.tasks.map((task) => (
            <div
              key={task.id}
              className="d-flex align-items-center mt-4"
              style={{ width: 650 }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "8px 15px",
                  borderRadius: "8px",
                  backgroundColor: task.status ? "#d4edda" : "#ffc0cb",
                  color: task.status ? "#155724" : "#a14c6c",
                  textDecoration: task.status ? "line-through" : "none",
                  boxShadow: "1px 5px 10px rgba(255,182,193,0.6)",
                }}
              >
                {task.title}
              </div>

              <input
                type="checkbox"
                checked={task.status}
                onChange={() => this.toggleDone(task)}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 15,
                  cursor: "pointer",
                }}
              />
            </div>
          ))}

          {this.state.tasks.length === 0 && (
            <p style={{ marginTop: 30, color: "#a14c6c" }}>
              No tasks in this list 🌸
            </p>
          )}
        </div>
      </>
    );
  }
}

export default withParams(TasksView);
