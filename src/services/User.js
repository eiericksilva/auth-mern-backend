import User from "../models/User.js";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) return user;
};

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};
