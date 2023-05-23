import jwt from "jsonwebtoken";

const generateToken = async ({ ...payload }) => {
  const token = jwt.sign({ payload }, process.env.SECRET_JWT, {
    expiresIn: "24h",
  });
  return token;
};

export default generateToken;
