import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/home/Home";
import Signin from "./screens/signin/Signin";
import Signup from "./screens/signup/Signup";
import Blog from "./screens/blog/Blog";
import AddBlog from "./screens/addblog/AddBlog";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddBlog} />
        <Route path="/posts/:id" component={Blog} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
