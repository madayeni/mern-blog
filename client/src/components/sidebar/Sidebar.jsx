import "./sidebar.css";
import { items } from "./items";

const Sidebar = () => {
  return (
    <article className="sidebar">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <i className={item.icon}></i>
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Sidebar;
