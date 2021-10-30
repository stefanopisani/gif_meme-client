import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";
import { useContext } from "react";

function PostByCat({ searchValue, match }) {
  const [showGif, setShowGif] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const loggedInUser = useContext(LoggedUserConsumer);

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
        console.log(showGif);
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
        <p>Check out the latest posts {loggedInUser.username}</p>
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

      {filteredPosts.length % 2 === 1 && filteredPosts.length !== 1 && (
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
                      style={{ height: 400, borderRadius: 15 }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{post.title}</h5>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </section>
      )}

      {filteredPosts.length % 2 === 0 && (
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
                      style={{ height: 400, borderRadius: 15, maxWidth: 500 }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{post.title}</h5>
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
                        style={{ height: 400, borderRadius: 15, maxWidth: 500 }}
                      />
                      <div class="card-body">
                        <h5 class="card-title">{post.title}</h5>
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
  );
}

export default PostByCat;
