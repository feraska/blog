import React, { useContext, useEffect, useState } from 'react';
import "./singlePost.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PF, proxy } from '../../../constant';
import axios from 'axios';
import {Context} from "../../context/Context"
const SinglePost = () => {
  const params = useParams()
  const id = params.id
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate()
  window.scrollTo(
    {
      top:0,
      behavior:'smooth'
    }
  )
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${proxy}/posts/` + id);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPost(res.data);
    };
    getPost();
  }, [id]);
  const handleDelete = async () => {
    try {
      await axios.delete(`${proxy}/posts/${post._id}`, 
        {data:{ username: user.username }},
      );
      navigate("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${proxy}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };
    return (
        <div className="singlePost">
        <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode?(
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
           
          />
        ): <h1 className="singlePostTitle">
        {title}
        {post.username===user?.username&&
          <div className="singlePostEdit">
          <FontAwesomeIcon icon={faPenToSquare} className="singlePostIcon"  onClick={() => setUpdateMode(true)}/>
          <FontAwesomeIcon icon={faTrash} className="singlePostIcon" onClick={handleDelete}/>
          </div>
        }
          
        </h1>
      }
         
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
             
            </span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) :(
          <p className="singlePostDesc">
            {desc}
          </p>
        )}
         {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
            )}
        </div>
      </div>
    )
}

export default SinglePost;