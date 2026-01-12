import { Component } from "react";

class ListsView extends Component {
  state = {
    showForm: false,
    title: "",
    dueDate: "",
    lists: [],
  };


componentDidMount() {
  this.fetchLists();
}

fetchLists = async () => {
  try {
    const res = await fetch("http://localhost:5013/lists");
    const data = await res.json();
      this.setState({ lists: Array.isArray(data) ? data : data.lists });
  } catch (error) {
    console.error("Error fetching lists:", error)
  }
};

  handleOpenForm = (e) => {
    e.preventDefault();
    this.setState({ showForm: true });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddList = async (e) => {
    e.preventDefault();

    if (!this.state.title.trim()) return;

    try{
      const res = await fetch("http://localhost:5013/lists", {
        method: "POST",
        headers: {"Content-Type": "application/json", },
        body: JSON.stringify({
          title: this.state.title,
        }),
    });

    const newList = await res.json();

    this.setState((prev) => ({
      lists: [...prev.lists, newList],
      title: "",
      showForm: false,
    }));
  } catch (error) {
    console.error("Error adding list:", error);
  }
  };

  handleDeleteList = async (id) => {
    try {
      await fetch(`http://localhost:5013/lists/${id}`, {
        method:"DELETE",
      });

      this.setState((prev) => ({
        lists: prev.lists.filter((list) => list.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  render() {
    const { showForm, title, lists } = this.state;

    return (
      <>
        {/* NAVBAR */}
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
            <span
              className="navbar-brand fw-bold"
              style={{
                color: "#a14c6c",
                fontSize: "1.5rem",
                letterSpacing: "1px",
              }}
            >
              🌸 To-do
            </span>

            <button
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
              Create new to-do list ➕
            </button>
          </div>
        </nav>

        <div
          className="min-vh-100 d-flex flex-column align-items-center pt-5"
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
            YOUR TO-DO LISTS
          </h1>

          <p
            style={{
              color: "#d7a6b8",
              fontSize: "1.2rem",
              marginBottom: "40px",
            }}
          >
            Stay organized.
          </p>

          {/* FORM */}
          {showForm && (
            <form onSubmit={this.handleAddList} style={{ maxWidth: "400px" }}>
              <input
                type="text"
                name="title"
                className="form-control mb-3"
                placeholder="e.g. Shopping list"
                value={title}
                onChange={this.handleChange}
              />
              <button className="btn btn-pink w-100">Add list</button>
            </form>
          )}

          {/* LISTS */}
          <div className="container mt-4">
            <div className="row g-3 justify-content-center">
              {lists.map((list) => (
                <div
                  key={list.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div
                    style={{
                      backgroundColor: "#fff6fa",
                      borderRadius: "16px",
                      padding: "15px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 style={{ margin: 0 }}>{list.title}</h5>
                      <button
                        className="btn"
                        onClick={() =>
                          this.handleDeleteList(list.id)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {lists.length === 0 && (
                <p style={{ color: "#d7a6b8" }}>
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