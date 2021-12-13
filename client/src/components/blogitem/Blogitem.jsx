import "./blogitem.css";
import moment from "moment";
import { Link } from "react-router-dom";
const Blogitem = (props) => {
  const { photo, title, author, createdAt, _id } = props.post;
  return (
    <Link to={`/posts/${_id}`} className="blog-link">
      <article className="blog">
        <div className="left">
          <img src={photo} alt={title} />
        </div>
        <div className="right">
          <div>{title}</div>
          <div>{moment(createdAt).format("MMMM Do YYYY, h:mm a")}</div>
          <div>{author}</div>
        </div>
      </article>
    </Link>
  );
};

export default Blogitem;
