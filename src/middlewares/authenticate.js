import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("Token no provided");
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json("Invalid token type");
  }

  const [schema, token] = parts;
  if (schema.indexOf("Bearer") !== 0) {
    return res.status(401).json("Token malformatted");
  }

  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json("Token invalid/expired");
    }
    req.currentUser = decoded;
    return next();
  });
};

export default authenticate;
