import { useState } from "react";
import "./search.css";

const Search = () => {
  const [value, setValue] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="search-container flex flex-b">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="search-submit btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
