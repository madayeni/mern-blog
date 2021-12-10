import { Link } from "react-router-dom";
import "./notfound.css";
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h1>The reuqested page was not found...</h1>
      <Link to="/">
        <h2>Please return to home page</h2>
      </Link>
    </div>
  );
};

export default NotFound;
