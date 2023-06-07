import User from "../models/User.js";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) return user;
};

export const getFullUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  if (user) return user;
};

export const createUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user.username;
};
