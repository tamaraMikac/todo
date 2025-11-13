import { Component } from "react";
import slika from "../images/slika2.png";
class LoginView extends Component {
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
                required
              />
            </div>

            <button
              type="button"
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

            <p className="mt-4 text-center">
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
                Register here
              </div>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginView;
