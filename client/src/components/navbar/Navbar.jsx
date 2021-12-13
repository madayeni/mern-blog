import "./navbar.css";
import Search from "../search/Search";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortPosts } from "../../redux/postslice";
import { signout } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const handleChange = (e) => {
    dispatch(sortPosts({ value: e.target.value }));
    history.push("/");
  };
  const handleSignout = () => {
    dispatch(signout());
    history.push("/");
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
          <div className="flex">
            <Link to="/add" className="btn">
              Write
            </Link>
            <button className="btn btn-outline" onClick={handleSignout}>
              Sign out
            </button>
            <div className="profile">{user.username[0].toUpperCase()}</div>
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
