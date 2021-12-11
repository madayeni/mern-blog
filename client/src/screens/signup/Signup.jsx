import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./signup.css";
import { signup } from "../../redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ email, username, password }));
    setEmail("");
    setPassword("");
    setUsername("");
  };

  if (user.id) {
    return <Redirect to="/" />;
  }
  return (
    <section className="signup-container">
      <h2 className="title">Welcome to Awesome Blogs</h2>
      <p className="title">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
      <form className="flex flex-c" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Register
        </button>
      </form>
    </section>
  );
};

export default Signup;
