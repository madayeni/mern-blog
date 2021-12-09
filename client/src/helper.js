export const sortString = (a, b, type) => {
  if (a < b) {
    return type === "asc" ? -1 : 1;
  } else if (a > b) {
    return type === "asc" ? 1 : -1;
  } else {
    return 0;
  }
};

export const sortCriteria = (value) => {
  let sortBy = "";
  let dir = "";
  if (value === "newest") {
    sortBy = "createdAt";
    dir = "desc";
  } else if (value === "oldest") {
    sortBy = "createdAt";
    dir = "asc";
  } else if (value === "likes") {
    sortBy = "likes";
    dir = "desc";
  } else if (value === "comments") {
    sortBy = "comments";
    dir = "desc";
  }
  return { sortBy, dir };
};
