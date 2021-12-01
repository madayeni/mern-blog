import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  return (
    <section className="signup-container">
      <h2 className="title">Welcome to Awesome Blogs</h2>
      <p className="title">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
      <form className="flex flex-c">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </section>
  );
};

export default Signup;
