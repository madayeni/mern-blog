import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("not authorized");
  }
  const secretKey = process.env.SECRET_KEY;
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};

export default auth;
