import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/postslice";

const SingleBlog = (props) => {
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  return <div>hi</div>;
};

export default SingleBlog;
