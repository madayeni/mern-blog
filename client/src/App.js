import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Blog from "./screens/Blog";
import AddBlog from "./screens/AddBlog";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddBlog} />
        <Route path="/blogs/:id" component={Blog} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
