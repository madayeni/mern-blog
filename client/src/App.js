import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import Signin from "./screens/signin/Signin";
import Signup from "./screens/signup/Signup";
import Blog from "./screens/blog/Blog";
import AddBlog from "./screens/addblog/AddBlog";
import NotFound from "./screens/not-found/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddBlog} />
        <Route path="/posts" component={Home} exact />
        <Route path="/posts/:id" component={Blog} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
