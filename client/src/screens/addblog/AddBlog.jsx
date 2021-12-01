import Addform from "../../components/addform/Addform";
import Leftbar from "../../components/leftbar/Leftbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addblog.css";

const AddBlog = () => {
  return (
    <section className="main-grid">
      <Leftbar />
      <Addform />
      <Sidebar />
    </section>
  );
};

export default AddBlog;
