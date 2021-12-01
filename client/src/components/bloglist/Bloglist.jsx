import Blogitem from "../blogitem/Blogitem";
import { useSelector, useDispatch } from "react-redux";
import "./bloglist.css";
import { useEffect } from "react";
import { getPosts } from "../../redux/postslice";

const Bloglist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const { error, posts, loading } = useSelector((state) => state.posts);
  return (
    <article>
      {loading && <div>Loading</div>}
      {error && <div>error</div>}
      {posts && posts.map((post) => <Blogitem key={post._id} post={post} />)}
    </article>
  );
};

export default Bloglist;
