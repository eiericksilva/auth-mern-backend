import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getFullUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  if (user) return user;
};

export const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: "1d",
  });
