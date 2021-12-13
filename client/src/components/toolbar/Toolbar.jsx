import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeEditMode,
  commentOnPost,
  deletePost,
  likePost,
} from "../../redux/postslice";
import "./toolbar.css";
import { useHistory } from "react-router-dom";

const Toolbar = () => {
  const curPost = useSelector((state) => state.posts.curPost);
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const history = useHistory();

  const handleClick = () => {
    dispatch(likePost({ id: curPost._id, user_id: auth.id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const comment = {
      user_id: auth.id,
      comment: value,
    };
    dispatch(commentOnPost({ id: curPost._id, comment }));
    setValue("");
  };

  const handleDelete = () => {
    dispatch(deletePost({ id: curPost._id }));
    history.push("/");
  };

  const handleEdit = () => {
    dispatch(changeEditMode(true));
    history.push("/add");
  };
  const isLiked = curPost?.likes.includes(auth.id);
  return (
    <div className="blog-toolbar">
      <div className="likes">
        <i className="fas fa-heart"></i>
        <h2>{curPost?.likes.length} Likes</h2>
      </div>
      <div className="comments">
        <ul>
          <li>{curPost?.comments.length} comments</li>
          {curPost?.comments.map((comment, ind) => (
            <li key={ind}>{comment.comment}</li>
          ))}
        </ul>
      </div>
      {!token && <p>Please log in to like or comment!</p>}
      {token && (
        <div className="edit">
          <button className="btn" onClick={handleClick}>
            <i
              className={isLiked ? "fas fa-heart fa-2x" : "far fa-heart fa-2x"}
            ></i>
          </button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Write a comment!</label>
            <input
              type="comment"
              id="comment"
              value={value}
              placeholder="Write..."
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn" type="submit">
              Send!
            </button>
          </form>
          {auth.username === curPost?.author && (
            <div className="edit-post">
              <i className="fas fa-trash" onClick={handleDelete}></i>
              <i className="fas fa-edit" onClick={handleEdit}></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
