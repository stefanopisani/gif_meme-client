import React, { useState } from "react";
import { useHistory , NavLink} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function Signup(){
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const history = useHistory();

const handleFormSubmit = async (e)=> {
    e.preventDefault();
    const body = {
        username,
        password
    };
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/signup`, body);
    toast.success("signup success");
    history.push("/")
}

    return(
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


        <button type="submit" className="btn btn-outline-info">Sign up</button>
        </form>
        <p>Already have an account? login <NavLink to="/login">here</NavLink></p>
        </>
    )
}


