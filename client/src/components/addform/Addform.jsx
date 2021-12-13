import "./addform.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost, changeEditMode, editPost } from "../../redux/postslice";
import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase64 from "react-file-base64";

const Addform = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.posts.editMode);
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const curPost = useSelector((state) => state.posts.curPost);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!editMode) {
      dispatch(addPost({ title, body, photo: url, author: user.username }));
    } else {
      dispatch(
        editPost({
          id: curPost?._id,
          title,
          body,
          photo: url,
          author: user.username,
        })
      );
      dispatch(changeEditMode(false));
    }

    setTitle("");
    setBody("");
    setUrl("");
    history.push("/");
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editMode) {
      setTitle(curPost?.title);
      setBody(curPost?.body);
      setUrl(curPost?.photo);
    }
  }, [curPost, editMode]);

  if (!user.id) {
    toast("Please sign in First!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return <Redirect to="/signin" />;
  }
  return (
    <section className="add">
      {!editMode && <h2>Share what is in your mind...</h2>}
      {editMode && <h2>Edit your post here...</h2>}

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
          <label htmlFor="url">Enter your pic's URL or upload a photo</label>
          <input
            type="text"
            id="url"
            autoComplete="off"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setUrl(base64)}
          />
        </div>

        <button type="submit" className="btn">
          {editMode ? "Update" : "Post"}
        </button>
      </form>
    </section>
  );
};

export default Addform;
