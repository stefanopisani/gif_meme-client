import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditPost({match}) {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory()

useEffect(()=> {
    async function getPost(){
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`)
        setTitle(response.data.title);
        setDescription(response.data.description);
    }
    getPost();
}, []);

const handleFormSubmit = async (e)=> {
    e.preventDefault();
    const body= {
        title,
        description,
        imageUrl: "someimage.url"
    };
    await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`, body);
    toast.success("Post Updated");
    history.push("/posts");
}

    return (
        <>
        <h2>Edit Project</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
  
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
  
          <button type="submit">Create</button>
        </form>
      </>
    )
}