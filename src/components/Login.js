import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ setCurrentLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/login`,
        body,
        { withCredentials: true }
      );
      if (response.data.username) {
        toast.success("Login success");
        setCurrentLoggedInUser(response.data); //Comes from the app component
        history.push("/");
      }
    } catch (e) {
      toast.error("Invalid login");
    }
  };

  return (
    <>
      
      <form onSubmit={handleFormSubmit} style={{width:500, margin: "auto"}} className="my-5">



      <div class="input-group flex-nowrap my-2">
          <span class="input-group-text" id="addon-wrapping">
            User
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Your Username"
            aria-describedby="addon-wrapping"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

      <div class="input-group flex-nowrap my-2">
          <span class="input-group-text" id="addon-wrapping">
            Password
          </span>
          <input
            type="password"
            class="form-control"
            placeholder="Your Password"
            aria-describedby="addon-wrapping"
            onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
        </div>


        <button type="submit" className="btn btn-outline-info">Login</button>
        </form>
      <p>Don't have an account? register <NavLink to="/signup">here</NavLink></p>
    </>
  );
}

export default Login;