import Addform from "../../components/addform/Addform";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addblog.css";

const AddBlog = () => {
  return (
    <section className="main-grid container">
      <Addform />
      <Sidebar />
    </section>
  );
};

export default AddBlog;
