import "./App.css";

import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { LoggedUserProvider } from "./context/loggedUser";


import ListPosts from "./components/ListPosts";
import PostDetails from "./components/PostDetails";
import NavBar from "./components/Navbar";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import UserPosts from "./components/UserPosts";


function App() {
  const [loggedInUser, setCurrentLoggedInUser] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function checkLoggedIn() {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/isloggedin`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.username) {
        setCurrentLoggedInUser(response.data);
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <>
      <LoggedUserProvider value={loggedInUser}>
      <ToastContainer />

      <NavBar
        loggedInUser={loggedInUser}
        setCurrentLoggedInUser={setCurrentLoggedInUser}
        setSearchValue={setSearchValue}
      />
      <div className="App" style={{maxWidth:"1024px", margin:"auto", minHeight:"80vh"}}>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => {
              return <Login setCurrentLoggedInUser={setCurrentLoggedInUser} />;
            }}
          />
          <Route exact path="/signup" component={Signup} />


          <Route exact path={["/", "/posts"]} render={(props)=> {
            return <ListPosts {...props} searchValue={searchValue}/>
          }} />
          <PrivateRoute exact path="/user-posts" render={(props)=> {
            return <UserPosts {...props} searchValue={searchValue}/>
          }} />
          <PrivateRoute exact path="/posts/add" component={AddPost} />
          <PrivateRoute exact path="/posts/:id" component={PostDetails} />
          <PrivateRoute exact path="/posts/:id/edit" component={EditPost} />
          
        </Switch>
      </div>
      </LoggedUserProvider>
    </>
  );
}

export default App;



