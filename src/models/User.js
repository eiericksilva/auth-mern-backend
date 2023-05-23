import mongoose from "mongoose";
const { Schema } = mongoose;
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: false },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

export default mongoose.model("User", UserSchema);
