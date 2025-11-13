import { Component } from "react";

class ListsView extends Component {
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
                Create new to-do list ➕
              </a>
            </div>
          </div>
        </nav>
        <div
          className="min-vh-100 d-flex flex-column align-items-center justify-content-start pt-5"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ fontSize: "5rem", marginBottom: "10px" }}>🌸</div>
          <h1
            style={{
              fontSize: "3.8rem",
              fontWeight: "300",
              color: "#e6b7c7",
              textAlign: "center",
              letterSpacing: "3px",
            }}
          >
            {" "}
            YOUR TO-DO LISTS
          </h1>

          <p
            style={{
              color: "d7a6b8",
              fontSize: "1.2rem",
              marginBottom: "40px",
            }}
          >
            {" "}
            Stay organized.{" "}
          </p>
        </div>
      </>
    );
  }
}

export default ListsView;
