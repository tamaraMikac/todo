import { Component } from "react";

class ListsView extends Component {
  state = {
    showForm: false,
    title: "",
    dueDate: "",
    lists: [],
  }

 handleOpenForm = (e) => {
 e.preventDefault();
 this.setState({ showForm: true});
 }

 handleChange = (e) => {
  this.setState({
  [e.target.name]: e.target.value,
  });
 }

 handleAddList = (e) => {
  e.preventDefault();
 

 if (!this.state.title.trim()) return;

 const newList = {
  id: Date.now(),
  title: this.state.title,
 };

 this.setState((prev) => ({
lists: [...prev.lists, newList],
title: "",
showForm:false,
 }));
 };

  render() {
    const {showForm, title, lists} = this.state;
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
                onClick={this.handleOpenForm}
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


          { showForm && (
            <div
            style={{
              backgroundColor:"#fff6fa",
              borderRadius:"20px",
              padding: "20px 25px",
              boxShadow: "0px 4px 12px rgba(255,182,193,0.5)",
              maxWidth:"400px",
              width:"100%",
              marginBottom:"30px"
            }}
            >
            <h3 style={{ color: "#a14c6c", marginBottom: "15px" }}>New list</h3>

            <form onSubmit={this.handleAddList}>
               <div className="mb-3">
                  <label className="form-label" style={{ color: "#a14c6c" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="ex. Shopping list"
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: "#ffbfd4",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add list
                </button>
              </form>
            </div>
          )}

          <div className="container">
            <div className="row g-3 justify-content-center">
              {lists.map((list) => (
                <div
                key={list.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                    style={{
                      backgroundColor: "#fff6fa",
                      borderRadius: "16px",
                      padding: "15px 18px",
                      boxShadow: "0px 3px 10px rgba(255,182,193,0.4)",
                    }}
                  >
                    <h5 style={{ color: "#a14c6c", fontWeight: "600" }}>
                      {list.title}
                    </h5>
                  </div>
                </div>
              ))}

              {lists.length === 0 && (
                <p style={{ color: "#d7a6b8", marginTop: "10px" }}>
  You don’t have any lists yet. Create one above. 🌸
                </p>
              )}
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default ListsView;
