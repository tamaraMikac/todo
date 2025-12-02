import { Component } from "react";
import slika from "../images/slika2.png";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";
class SignupView extends Component {
constructor(props) {
  super(props);
  this.state = {
    user: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
  };
}

PostSignUp = async () => {
  const {user} = this.state;
  const {
    firstName, lastName, email, password
  } = user;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!firstName || !lastName || !password || !email) {
    alert("All fields are required!");
    return;
  }
  if(!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if(password.length < 8){
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const payload = { lastName, firstName, email, password,};
    const { data, status } = await axios.post(
      API_URL + '/users/register',
      payload,
      { headers: { 'Content-Type': 'application/json'}, timeout: 10000 }
    );

    console.log("REGISTER OK: ", status, data);
    alert(data?.message || "User registered successfully!");
    window.location.href = "/";

  } catch (err) {
    const serverData = err?.response?.data;
    const serverStatus = err?.response?.status;
    console.error("REGISTER ERROR: ", serverData, serverStatus, err);

    const msg = 
    serverData?.error ||
    serverStatus?.error ||
    err?.message || "Registration failed";

    alert(`Error ${serverStatus || ''}: ${msg}`);

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
                value={this.state.user.firstName}
                onChange={(e) =>
                  this.setState({
                    user: { ...this.state.user, firstName: e.target.value },
                  })
                }
                required
              />
              <input
                type="last-name"
                className="form-control mt-4"
                placeholder="Enter your last name"
                value={this.state.user.lastName}
                onChange={(e) =>
                  this.setState({
                    user: { ...this.state.user, lastName: e.target.value },
                  })
                }
                required
              />
              <input
                type="email"
                className="form-control mt-4"
                placeholder="Enter your email address"
                value={this.state.user.email}
                onChange={(e) =>
                  this.setState({
                    user: { ...this.state.user, email: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={this.state.user.password}
                onChange={(e) =>
                  this.setState({
                    user: { ...this.state.user, password: e.target.value },
                  })
                }
                required
              />
            </div>

            <button
              type="button"
              onClick={this.PostSignUp}
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
