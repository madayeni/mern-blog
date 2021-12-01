import React from "react";
import Bloglist from "../../components/bloglist/Bloglist";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <section className="main-grid container">
      <Sidebar />
      <Bloglist />
      <Sidebar />
    </section>
  );
};

export default Home;
