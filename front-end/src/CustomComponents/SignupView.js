import { Component } from "react";
import slika from "../images/slika2.png";
class SignupView extends Component {
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
            Create Account
          </h2>

          <form>
            <div className="mb-3">
              <label
                className="form-label fw-bold"
                style={{ color: "#4A2E3D" }}
              ></label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter your first name"
                required
              />
              <input
                type="last-name"
                className="form-control mt-4"
                placeholder="Enter your last name"
                required
              />
              <input
                type="email"
                className="form-control mt-4"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="button"
              className="btn w-100 fw-bold mb-5"
              style={{
                background: "#F7C6D9",
                color: "#4A2E3D",
                fontWeight: "500",
                borderRadius: "20px",
                boxShadow: "0 4px 12px rgba(255,150,190,0.4)",
              }}
            >
              {" "}
              Sign up{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupView;
