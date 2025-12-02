import { Component } from "react";
import { Link } from "react-router-dom";
import slika from "../images/slika2.png";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password:"", error: "" }
  }

  handleLogin = async () => {
  try {
        console.log("API_URL =", API_URL);
    const response = await axios.post(`${API_URL}/users/login`,  {
        email: this.state.email,
        password: this.state.password,
      },
      {
        withCredentials: true
      }
    );

   console.log("LOGIN OK: ", response.data);
   this.setState({error:""});
   window.location.href="/lists";
  }catch (err) {
    console.error("Login error: ", err);
    if(err.response) {
      this.setState({
       error: err.response.data?.error || "Napaka strežnika."
        });
      } else {
        this.setState({ error: "Napaka omrežja (strežnik nedostopen)." });
      }
    }
  };

  render() {
    return (
      <div
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${slika})`,
          fontFamily: "'Poppins', sans-serif",
          backgroundSize: "cover",
          backgroundPosition: "120px 5px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="row shadow-lg overflow-hidden"
          style={{
            borderRadius: "35px",
            maxWidth: "500px",
            width: "100%",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.6)",
            boxShadow: "0px 12px 40px rgba(255, 160, 200, 0.2)",
          }}
        >
          <div className="p-3 d-flex flex-column justify-content-center"></div>
          <h2
            className="mb-2 fw-bold"
            style={{ color: "#4A2E3D", textAlign: "center" }}
          >
            Welcome to Your Task Board
          </h2>
          <p className="mb-4 text-muted" style={{ color: "#4A2E3D" }}>
            Log in to continue managing your tasks.
          </p>
          <form>
            <div className="mb-3">
              <label
                className="form-label fw-bold"
                style={{ color: "#4A2E3D" }}
              >
                {" "}
                Email adress{" "}
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                className="fw-bold form-label"
                style={{ color: "#4A2E3D" }}
              >
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
                required
              />
            </div>

            <button
              type="button"
              onClick={this.handleLogin}
              className="btn w-100 fw-bold"
              style={{
                background: "#F7C6D9",
                color: "#4A2E3D",
                fontWeight: "500",
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(255,150,190,0.4)",
              }}
            >
              {" "}
              Log in{" "}
            </button>

            <div className="mt-4 text-center">
              <span className="text-muted" style={{ color: "#4A2E3D" }}>
                {" "}
                Don't have an account?{" "}
              </span>
              <div
                style={{
                  color: "#4A2E3D",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                <Link to="/signup">
                Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginView;
