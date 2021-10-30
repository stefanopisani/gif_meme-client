import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function NavBar({ loggedInUser, setCurrentLoggedInUser, setSearchValue }) {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false)
  const history = useHistory();

  const logoutUser = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
      withCredentials: true,
    });
    setCurrentLoggedInUser("");
  };

  useEffect(() => {
    console.log(search);
    setSearchValue(search);
  }, [search]);

  const filterByCat = (filter) => {
    history.push(`/posts?q=${filter}`);
  };

  const changeNav = () => {
    setActive(!active);
  }

  return (
    <>
      {loggedInUser ? (
        <>
          <nav id="nav-boot" className={"navbar navbar-expand-lg navbar-light " + (active && "activeNav")}>
            <div className="container-fluid">
              <a className="navbar-brand" id="nav-brand" href="/">
                {" "}
                Gif || Meme{" "}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" onClick={changeNav}></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-list">
                  <li className="nav-item navbar-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/posts/add"
                    >
                      {" "}
                      Share yours{" "}
                    </a>
                  </li>

                  <li className="nav-item navbar-item">
                    <a className="nav-link" href="/user-posts">
                      {" "}
                      Check yours 🤟🏻{" "}
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Check by category
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li onClick={() => filterByCat("funny")}>Funny</li>
                      <li onClick={() => filterByCat("entertainment")}>
                        Entertainment
                      </li>
                      <li onClick={() => filterByCat("sports")}>Sports</li>
                      <li onClick={() => filterByCat("reactions")}>
                        Reactions
                      </li>
                      <li onClick={() => filterByCat("others")}>Others</li>
                    </ul>
                  </li>
                </ul>

                <form className="d-flex">
                  <input
                    value={search}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>

                <form className="d-flex auth-buttons">
                  {/* <figure className="image mt-2">
              <NavLink exact to= {`/users/${loggedInUser._id}`} > 
                <img src={loggedInUser.imageUrl} style={{height:40, width:40, borderRadius:50}} alt=""/>  
              </NavLink>
            </figure>   */}

                  <div className="navbar-item">
                    <div className="buttons">
                      {/* <NavLink className="button is-primary mr-3" exact to="/">
                <strong> + </strong>
                </NavLink>                  */}
                      <NavLink
                        className="btn btn-info"
                        activeClassName="btn btn-info me-2"
                        onClick={logoutUser}
                        to="/"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav id="nav-boot" className={"navbar navbar-expand-lg navbar-light " + (active && "activeNav")}>
            <div className="container-fluid">
              <a className="navbar-brand" id="nav-brand" href="/">
                {" "}
                Gif || Meme{" "}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"  onClick={changeNav}></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-list">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Check by category
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li onClick={() => filterByCat("funny")}>Funny</li>
                      <li onClick={() => filterByCat("entertainment")}>
                        Entertainment
                      </li>
                      <li onClick={() => filterByCat("sports")}>Sports</li>
                      <li onClick={() => filterByCat("reactions")}>
                        Reactions
                      </li>
                      <li onClick={() => filterByCat("others")}>Others</li>
                    </ul>
                  </li>
                </ul>

                <form className="d-flex">
                  <input
                    value={search}
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>

                <form className="d-flex auth-buttons">
               
                  <NavLink className="btn btn-info me-2" activeClassName="btn btn-info me-2" exact to="/signup">
                    <strong> Signup </strong>
                  </NavLink>
                  <NavLink className="btn btn-info me-2" activeClassName="btn btn-info me-2" exact to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-info me-2" activeClassName="btn btn-info me-2" exact to="/login/google">
                    Login with Google
                  </NavLink>
                </form>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default NavBar;
