import "./blogitem.css";
import moment from "moment";
import { Link } from "react-router-dom";
const Blogitem = (props) => {
  const { photo, title, author, createdAt, _id, likes, comments } = props.post;
  return (
    <Link to={`/posts/${_id}`} className="blog-link">
      <article className="blog">
        <div className="left">
          <img src={photo} alt={title} />
        </div>
        <div className="right">
          <div className="blog-title">{title}</div>
          <div className="blog-date">
            {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
          </div>
          <div className="blog-author">By {author}</div>
          <div className="blog-likes-comments">
            <div className="blog-likes">
              <i className="fas fa-heart"></i>
              {likes.length}
            </div>
            <div className="blog-comments">
              <i className="fas fa-comment"></i>
              {comments.length}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Blogitem;
