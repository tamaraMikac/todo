import { Component } from "react";

class ListsView extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "pink" }}
        >
          <div className="container-fluid px-4">
            <a className="navbar-brand text-back fw-bold" href="#">
              To-do{" "}
            </a>
            <div className="d-flex gap-2">
              <a className="btn btn-sm btn-light" href="#">
                {" "}
                Create new to-do list ➕
              </a>
            </div>
          </div>
        </nav>
        <div
          className="min-vh-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "white",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              color: "#d3d3d3",
              textAlign: "center",
            }}
          >
            {" "}
            YOUR TO-DO LISTS
          </h1>
        </div>
      </>
    );
  }
}

export default ListsView;
