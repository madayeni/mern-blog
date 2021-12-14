import "./singleblog.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/postslice";
import moment from "moment";

const SingleBlog = (props) => {
  const id = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.curPost);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  return (
    <div>
      {!post && <h1>Loading...</h1>}
      {post?._id && (
        <div className="single-blog">
          <img src={post.photo} alt={post.title} />
          <h1 className="blog-title">{post.title}</h1>
          <h2 className="blog-author">Written by {post.author}</h2>
          <h3 className="blog-date">{moment(post.createdAt).fromNow()}</h3>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
