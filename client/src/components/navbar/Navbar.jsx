import "./navbar.css";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sortPosts } from "../../redux/postslice";

const Navbar = () => {
  let user = false;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(sortPosts({ sortBy: e.target.value }));
  };
  return (
    <nav className="navbar">
      <div className="toolbar container">
        <h3>
          <Link to="/">Awesome Blogs</Link>
        </h3>
        <Search />
        <div className="flex filter">
          <p>Sort By</p>
          <select onChange={handleChange}>
            <option value="newest">Newest</option>
            <option value="likes">Likes</option>
            <option value="comments">Comments</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {user && (
          <div>
            <Link to="./add" className="btn">
              Write
            </Link>
            <button className="btn btn-outline">Sign out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/signin" className="btn">
              Sign In
            </Link>
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
