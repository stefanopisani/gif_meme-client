// import React, { useState, useEffect, useContext, useRef } from "react";
// import {
//   EmailShareButton,
//   EmailIcon,
//   FacebookMessengerShareButton,
//   FacebookMessengerIcon,
//   FacebookShareButton,
//   FacebookIcon,
//   LinkedinShareButton,
//   RedditShareButton,
//   TelegramShareButton,
//   TwitterShareButton,
//   TwitterIcon,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
// import axios from "axios";
// import { useHistory, NavLink } from "react-router-dom";
// import { LoggedUserConsumer } from "../context/loggedUser";

// function PostDetails({ match }) {
//   const [copied, setCopied] = useState(false);
  
//   const [post, setPost] = useState({});
//   const history = useHistory();
//   const loggedInUser = useContext(LoggedUserConsumer);

//   // const shareUrl = window.location.href.toString();
//   const shareUrl = post.imageUrl
//   console.log(post.imageUrl);
//   const title = post.title;

//   useEffect(() => {
//     async function getPostDetails() {
//       const response = await axios.get(
//         `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`
//       );
//       setPost(response.data);
//       console.log(response.data);
//     }
//     getPostDetails();
    
//   }, []);

//   function copy() {
//     const el = document.createElement("input");
//     el.value = post.imageUrl;
//     document.body.appendChild(el);
//     el.select();
//     document.execCommand("copy");
//     document.body.removeChild(el);
//     setCopied(true);
//   }

//   const handleDeletePost = async (id) => {
//     await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${id}`);
//     history.push("/");
//   };

//   return (
//     <>
//       {/* {loggedInUser && <p>Check out the latest posts {loggedInUser.username}</p>} */}
//       {post && (
//         <>
//           <h2>{post.title}</h2>
//           <h3>{post.description}</h3>

//           {post.imageUrl && (
//             <img src={post.imageUrl} alt="pro" style={{ height: 400, borderRadius:"10%", margin:"30px 0"}} />
//           )}

//           <div className="share-options">
//             <FacebookShareButton
//               url={shareUrl}
//               quote={title}
//               className="Demo__some-network__share-button mx-1"
//             >
//               <FacebookIcon size={40} round />
//             </FacebookShareButton>

//             <WhatsappShareButton
//               url={shareUrl}
//               quote={title}
//               className="Demo__some-network__share-button mx-1"
//             >
//               <WhatsappIcon size={40} round />
//             </WhatsappShareButton>


//             <FacebookMessengerShareButton
//             url={shareUrl}
//             appId="521270401588372"
//             className="Demo__some-network__share-button mx-1"
//           >
//             <FacebookMessengerIcon size={40} round />
//           </FacebookMessengerShareButton>


//           <TwitterShareButton
//             url={shareUrl}
//             title={title}
//             className="Demo__some-network__share-button mx-1"
//           >
//             <TwitterIcon size={40} round />
//           </TwitterShareButton>
//           </div>

//         {/* //////////////////////////////////////////// */}
//         <div>
//         <button class="btn btn-info my-3" onClick={copy}>{!copied ? "Copy link" : "Copied!"} </button>
//         </div>

//         {/* //////////////////// */}

//           {/* {post.user && post.user.username === loggedInUser.username && (
//             <>
//               <button onClick={() => handleDeletePost(post._id)}>Delete</button>
//               <NavLink
//                 activeStyle={{ color: "red" }}
//                 exact
//                 to={`/posts/${match.params.id}/edit`}
//               >
//                 Edit
//               </NavLink>
//             </>
//           )} */}
//         </>
//       )}
//     </>
//   );
// }

// export default PostDetails;


import React, { useState, useEffect, useContext, useRef } from "react";
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { LoggedUserConsumer } from "../context/loggedUser";

function PostDetails({ match }) {
  const [copied, setCopied] = useState(false);
  
  const [post, setPost] = useState({});
  const history = useHistory();
  const loggedInUser = useContext(LoggedUserConsumer);

  const shareUrl = window.location.href.toString();
  // const shareUrl = post.imageUrl
  console.log(post.imageUrl);
  const title = post.title;

  useEffect(() => {
    async function getPostDetails() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`
      );
      setPost(response.data);
      console.log(response.data);
    }
    getPostDetails();
    
  }, []);

  function copy() {
    const el = document.createElement("input");
    el.value = post.imageUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  const handleDeletePost = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${id}`);
    history.push("/");
  };

  return (
    <>
      {/* {loggedInUser && <p>Check out the latest posts {loggedInUser.username}</p>} */}
      {post && (
        <>
          <h2>{post.title}</h2>
          <h3>{post.description}</h3>

          {post.imageUrl && (
            <img src={post.imageUrl} alt="pro" style={{ maxWidth: 400, borderRadius:"10%", margin:"30px 0"}} />
          )}

          <div className="share-options">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="Demo__some-network__share-button mx-1"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              quote={title}
              className="Demo__some-network__share-button mx-1"
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>


            <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button mx-1"
          >
            <FacebookMessengerIcon size={40} round />
          </FacebookMessengerShareButton>


          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button mx-1"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          </div>

       
        <div>
        <button class="btn btn-info my-3" onClick={copy}>{!copied ? "Copy link" : "Copied!"} </button>
        </div>
        </>
      )}
    </>
  );
}

export default PostDetails;
