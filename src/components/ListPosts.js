import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import "./ListPosts.css";


function ListPosts({ searchValue }) {
  const [showGif, setShowGif] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const loggedInUser = useContext(LoggedUserConsumer);

  const search = useLocation().search;
  const category = new URLSearchParams(search).get("q");

  useEffect(() => {
    async function getAllPosts() {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts`, {
        withCredentials: true,
      });

      if (showGif) {
        setFilteredPosts(
          response.data.filter((post) => post.imageUrl.endsWith("gif"))
        );
      } else {
        setFilteredPosts(
          response.data.filter(
            (post) =>
              post.imageUrl.endsWith("jpg") || post.imageUrl.endsWith("png")
          )
        );
      }

      if (searchValue && showGif) {
        setFilteredPosts(
          response.data
            .filter((post) => post.imageUrl.endsWith("gif"))
            .filter((post) =>
              post.title.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
      } else if (searchValue && !showGif) {
        setFilteredPosts(
          response.data
            .filter(
              (post) =>
                post.imageUrl.endsWith("jpg") || post.imageUrl.endsWith("png")
            )
            .filter((post) =>
              post.title.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
      }
    }

    getAllPosts();
  }, [searchValue, showGif]);

  const toggleTypeGif = () => {
    setShowGif(true);
  };
  const toggleTypeMeme = () => {
    setShowGif(false);
  };

  return (
    <>
      {loggedInUser && (
        <p class="my-3">Check out the latest posts {loggedInUser.username}</p>
      )}

      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={toggleTypeGif}
        >
          Gif
        </button>
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={toggleTypeMeme}
        >
          Meme
        </button>
      </div>

      {/* you have the category -- if category -- filter by category else leave it as it is */}
      <div className="list" style={{maxWidth: "1024px", margin: "auto"}}>
        {category && (
          <>
            {filteredPosts.length >= 3 && (
              <section className="row mt-3">
                {filteredPosts
                  .filter((post) => post.category === category)
                  .map((post) => {
                    return (
                      <div className="gif-container col-md-4">
                        <NavLink to={`/posts/${post._id}`}>
                          <div key={post._id} class="p-2 m-1">
                            <img
                              src={post.imageUrl}
                              class="card-img-top"
                              alt="..."
                              style={{ height: 400, maxWidth:400, borderRadius: 15 }}
                            />
                            <div class="card-body">
                              <h5 class="card-title post-title">{post.title}</h5>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </section>
            )}

            {filteredPosts.length === 2 && (
              <section className="row mt-3">
                {filteredPosts
                  .filter((post) => post.category === category)
                  .map((post) => {
                    return (
                      <div className="gif-container col-md-6">
                        <NavLink to={`/posts/${post._id}`}>
                          <div key={post._id} class="p-2 m-1">
                            <img
                              src={post.imageUrl}
                              class="card-img-top"
                              alt="..."
                              style={{
                                height: 400, maxWidth:400,
                                borderRadius: 15,
                                maxWidth: 500,
                              }}
                            />
                            <div class="card-body">
                              <h5 class="card-title post-title">{post.title}</h5>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
              </section>
            )}

            {filteredPosts.length === 1 && (
              <section className="row mt-3">
                {filteredPosts
                  .filter((post) => post.category === category)
                  .map((post) => {
                    return (
                      <>
                        <div className="col-md-4"></div>
                        <div className="gif-container col-md-4">
                          <NavLink to={`/posts/${post._id}`}>
                            <div key={post._id} class="p-2 m-1">
                              <img
                                src={post.imageUrl}
                                class="card-img-top"
                                alt="..."
                                style={{
                                  height: 400, maxWidth:400,
                                  borderRadius: 15,
                                  maxWidth: 500,
                                }}
                              />
                              <div class="card-body">
                                <h5 class="card-title post-title">{post.title}</h5>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                        <div className="col-md-4"></div>
                      </>
                    );
                  })}
              </section>
            )}
          </>
        )}

        {!category && (
          <>
            {filteredPosts.length >= 3 && (
              <section className="row mt-3">
                {filteredPosts.map((post) => {
                  return (
                    <div className="gif-container col-md-4">
                      <NavLink to={`/posts/${post._id}`}>
                        <div key={post._id} class="p-2 m-1">
                          <img
                            src={post.imageUrl}
                            class="card-img-top"
                            alt="..."
                            style={{ height: 400, maxWidth:400, borderRadius: 15 }}
                          />
                          <div class="card-body">
                            <h5 class="card-title post-title">{post.title}</h5>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
              </section>
            )}

            {filteredPosts.length === 2 && (
              <section className="row mt-3">
                {filteredPosts.map((post) => {
                  return (
                    <div className="gif-container col-md-6">
                      <NavLink to={`/posts/${post._id}`}>
                        <div key={post._id} class="p-2 m-1">
                          <img
                            src={post.imageUrl}
                            class="card-img-top"
                            alt="..."
                            style={{
                              height: 400, maxWidth:400,
                              borderRadius: 15,
                              maxWidth: 500,
                            }}
                          />
                          <div class="card-body">
                            <h5 class="card-title post-title">{post.title}</h5>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
              </section>
            )}

            {filteredPosts.length === 1 && (
              <section className="row mt-3">
                {filteredPosts.map((post) => {
                  return (
                    <>
                      <div className="col-md-4"></div>
                      <div className="gif-container col-md-4">
                        <NavLink to={`/posts/${post._id}`}>
                          <div key={post._id} class="p-2 m-1">
                            <img
                              src={post.imageUrl}
                              class="card-img-top"
                              alt="..."
                              style={{
                                height: 400, maxWidth:400,
                                borderRadius: 15,
                                maxWidth: 500,
                              }}
                            />
                            <div class="card-body">
                              <h5 class="card-title post-title">{post.title}</h5>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                      <div className="col-md-4"></div>
                    </>
                  );
                })}
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ListPosts;
