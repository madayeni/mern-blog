import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SingleBlog from "../../components/singleblog/SingleBlog";

const Home = () => {
  return (
    <section className="main-grid container">
      <SingleBlog />
      <Sidebar />
    </section>
  );
};

export default Home;