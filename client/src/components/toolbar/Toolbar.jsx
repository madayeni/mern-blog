import "./toolbar.css";

const Toolbar = () => {
  return (
    <div className="blog-toolbar">
      <p>like</p>
      <form>
        <div>
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" />
        </div>
      </form>
    </div>
  );
};

export default Toolbar;
