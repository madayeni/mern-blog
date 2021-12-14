import "./navbar.css";
import Search from "../search/Search";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortPosts } from "../../redux/postslice";
import { signout } from "../../redux/authSlice";
import { useRef } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const hamburgerRef = useRef();
  const toolbarRef = useRef();

  const handleChange = (e) => {
    dispatch(sortPosts({ value: e.target.value }));
    history.push("/");
  };
  const handleSignout = () => {
    dispatch(signout());
    history.push("/");
  };
  const addActive = () => {
    if (hamburgerRef.current.classList.contains("active")) {
      hamburgerRef.current.classList.remove("active");
      toolbarRef.current.classList.remove("active");
    } else {
      hamburgerRef.current.classList.add("active");
      toolbarRef.current.classList.add("active");
    }
  };
  return (
    <nav className="navbar">
      <div className="container">
        <h3>
          <Link to="/">Awesome Blogs</Link>
        </h3>
        <div className="toolbar" ref={toolbarRef}>
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
        <div className="hamburger" onClick={addActive} ref={hamburgerRef}>
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
