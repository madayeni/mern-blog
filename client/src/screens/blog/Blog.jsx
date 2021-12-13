import React from "react";
import SingleBlog from "../../components/singleblog/SingleBlog";
import Toolbar from "../../components/toolbar/Toolbar";

const Blog = () => {
  return (
    <section className="main-grid container">
      <SingleBlog />
      <Toolbar />
    </section>
  );
};

export default Blog;
