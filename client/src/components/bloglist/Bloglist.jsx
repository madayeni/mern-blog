import Blogitem from "../blogitem/Blogitem";
import "./bloglist.css";

const Bloglist = () => {
  const a = [1, 2, 3, 4, 5];
  return (
    <article>
      {a.map((i) => (
        <Blogitem />
      ))}
    </article>
  );
};

export default Bloglist;
