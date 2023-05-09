import User from "../models/User.js";

export const editUser = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload);
  return user;
};
