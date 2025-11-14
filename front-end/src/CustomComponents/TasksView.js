import { Component } from "react";

class TasksView extends Component {
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
          <div className="container-fluid px-4 justify-content-between align-items-center">
            <a
              className="navbar-brand text-back fw-bold"
              href="#"
              style={{
                fontWeight: "700",
                color: "#a14c6c",
                fontSize: "1.5rem",
                letterSpacing: "1px",
              }}
            >
              🌸 To-do{" "}
            </a>
            <div className="d-flex gap-2">
              <a
                className="btn"
                href="#"
                style={{
                  backgroundColor: "#fffa",
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: "20px",
                  color: "#a14c6c",
                  fontWeight: "bold",
                  boxShadow: "0px 2px 8px rgba(255,182,193,0.6)",
                }}
              >
                {" "}
                My to-do lists 📃
              </a>
            </div>
          </div>
        </nav>
        <div
          className="min-vh-100 d-flex flex-column align-items-center justify-content-start pt-5"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ fontSize: "5rem", marginBottom: "10px" }}>🌸</div>
          <a
            className="btn"
            href="#"
            style={{
              backgroundColor: "#fffa",
              padding: "8px 20px",
              border: "none",
              borderRadius: "20px",
              fontWeight: "bold",
              boxShadow: "0px 2px 8px rgba(255,182,193,0.6)",
              color: "#a14c6c",
            }}
          >
            Add new task
          </a>
          <div className="min-vh-70 justify-content-center  align-items-center">
            <input
              type="text"
              className="form-control mt-5"
              placeholder="Example"
              style={{
                backgroundColor: "pink",
                width: 650,
                height: 40,
                boxShadow: "1px 5px 10px rgba(255,182,193,0.6)",
                color: "#a14c6c",
              }}
            />

            <input
              type="checkbox"
              className="form-control ml-5"
              style={{
                height: 40,
                width: 50,
                marginLeft: 700,
                marginTop: -40,
                boxShadow: "1px 5px 10px rgba(255,182,193,0.6)",
                color: "#a14c6c",
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default TasksView;
