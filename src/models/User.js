import mongoose from "mongoose";
const { Schema } = mongoose;
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
