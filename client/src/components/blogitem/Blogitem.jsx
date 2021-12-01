import "./blogitem.css";
import moment from "moment";
const Blogitem = (props) => {
  const { photo, title, author, createdAt } = props.post;
  return (
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
  );
};

export default Blogitem;
