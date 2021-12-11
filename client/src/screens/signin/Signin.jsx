import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./signin.css";
import { signin } from "../../redux/authSlice";

const Signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ user, password }));
    setUser("");
    setPassword("");
  };

  if (auth.id) {
    return <Redirect to="/" />;
  }
  return (
    <section className="signin-container">
      <h2 className="title">Welcome to Awesome Blogs</h2>
      <p className="title">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <form className="flex flex-c" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            placeholder="Email or Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Log In
        </button>
      </form>
    </section>
  );
};

export default Signin;
