import mongoose from "mongoose";
const { Schema } = mongoose;

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    banner: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    likes: {
      type: Array,
      require: true,
    },
    comments: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
