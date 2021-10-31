import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditPost({match}) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState("");
    const history = useHistory();

useEffect(()=> {
    async function getPost(){
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`)
        setTitle(response.data.title);
        setCategory(response.data.category);
    }
    getPost();
}, []);

const handleFormSubmit = async (e)=> {
    e.preventDefault();
    const body= {
        title,
        category
    };
    await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`, body);
    toast.success("Post Updated");
    history.push("/posts");
}

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
            placeholder="Change Name"
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

        <button type="submit" className="btn btn-outline-info">Edit</button>
      </form>
    </>
    )
}

// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function EditPost({match}) {
    
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const history = useHistory()

// useEffect(()=> {
//     async function getPost(){
//         const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`)
//         setTitle(response.data.title);
//         setDescription(response.data.description);
//     }
//     getPost();
// }, []);

// const handleFormSubmit = async (e)=> {
//     e.preventDefault();
//     const body= {
//         title,
//         description,
//         imageUrl: "someimage.url"
//     };
//     await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`, body);
//     toast.success("Post Updated");
//     history.push("/posts");
// }

//     return (
//         <>
//         <h2>Edit Project</h2>
//         <form onSubmit={handleFormSubmit}>
//           <label>Title</label>
//           <input
//             type="text"
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//           />
  
//           <label>Description</label>
//           <input
//             type="text"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//           />
  
//           <button type="submit">Create</button>
//         </form>
//       </>
//     )
// }