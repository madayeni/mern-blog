import "./addform.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/postslice";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Addform = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addPost({ title, body, photo: url, author: user.username }));
    setTitle("");
    setBody("");
    setUrl("");
    history.push("/");
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  if (!user.id) {
    toast("Please sign in First!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return <Redirect to="/signin" />;
  }
  return (
    <section className="add">
      <h2>Share what is in your mind...</h2>
      <form className="flex flex-c" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Body</label>
          <textarea
            placeholder="your awesome story"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="url">Your Pic's URL</label>
          <input
            type="text"
            id="url"
            autoComplete="off"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Post
        </button>
      </form>
    </section>
  );
};

export default Addform;
