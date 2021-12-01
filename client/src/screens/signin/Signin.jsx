import { Link } from "react-router-dom";
import "./signin.css";

const Signin = () => {
  return (
    <section className="signin-container">
      <h2 className="title">Welcome to Awesome Blogs</h2>
      <p className="title">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <form className="flex flex-c">
        <div className="form-control">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            autoComplete="off"
            id="email"
            placeholder="Email or Username"
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn">
          Log In
        </button>
      </form>
    </section>
  );
};

export default Signin;
