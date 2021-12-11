import "./toolbar.css";

import { useSelector } from "react-redux";

const Toolbar = () => {
  return (
    <div className="blog-toolbar">
      <div className="likes">
        <i className="fas fa-heart"></i>
        <h2>23 Likes</h2>
      </div>
      <div className="comments">
        <form>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" placeholder="Write" />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Toolbar;
