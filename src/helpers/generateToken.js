import jwt from "jsonwebtoken";

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: "24h",
  });
  return token;
};

export default generateToken;
