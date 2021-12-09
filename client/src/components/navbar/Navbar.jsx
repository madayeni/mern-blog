import "./navbar.css";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortPosts } from "../../redux/postslice";
import { signout } from "../../redux/usersSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const handleChange = (e) => {
    dispatch(sortPosts({ value: e.target.value }));
  };
  const handleSignout = () => {
    dispatch(signout());
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
        {user.id && (
          <div>
            <Link to="./add" className="btn">
              Write
            </Link>
            <button className="btn btn-outline" onClick={handleSignout}>
              Sign out
            </button>
          </div>
        )}
        {!user.id && (
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
