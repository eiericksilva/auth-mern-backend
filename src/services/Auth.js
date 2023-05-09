import User from "../models/User.js";

export const getFullUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  if (user) return user;
};
