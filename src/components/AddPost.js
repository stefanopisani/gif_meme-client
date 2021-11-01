import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import GifPicker from "gifpicker";
import "gifpicker/dist/style.css";
import { toast } from "react-toastify";

function AddPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [externalImage, setExternalImage] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const uploadData = new FormData();
      uploadData.append("file", image);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/upload`,
        uploadData
      );
      const body = {
        title,
        category,
        imageUrl: response.data.fileUrl,
      };

      await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/post`, body, {
        withCredentials: true,
      });
      history.push("/");
      toast('Thank you for sharing with our community 🙏🏻')
    } else {
      const body = {
        title,
        category,
        imageUrl: externalImage,
      };

      await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/post`, body, {
        withCredentials: true,
      });
      history.push("/");
      toast('Thank you for sharing with our community 🙏🏻')
    }
  };

  return (
    <>

    <h1 style={{fontSize:"30px", marginBottom:"30px"}}>Share your favourite Gif or Meme ❤️</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data" style={{width: 500, margin:"auto"}}>
        <div class="input-group flex-nowrap my-2">
          <span class="input-group-text" id="addon-wrapping">
            Title
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Give it a Name"
            aria-describedby="addon-wrapping"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div class="input-group flex-nowrap my-2">
        <span class="input-group-text" id="addon-wrapping">
            🎸
          </span>
        <select class="form-select" aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option selected>About your post</option>
          <option>funny</option>
          <option>reactions</option>
          <option>entertainment</option>
          <option>sports</option>
          <option>others</option>
        </select>
        </div>

        <input class="form-control my-2" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />


        <h2 class="mt-4"> Or pick one GIF from the library</h2>
        <GifPicker
          apikey="B17NU78V4FS4"
          onSelect={(gifUrl) => setExternalImage(gifUrl)}
        />

        <button type="submit" className="btn btn-outline-info">Share</button>
      </form>
    </>
  );
}

export default AddPost;
