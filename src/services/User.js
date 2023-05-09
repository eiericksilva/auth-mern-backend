import User from "../models/User.js";

export const verifyIfUserExists = async (email) => {
  if (await User.findOne({ email })) return true;
};

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};
