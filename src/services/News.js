import News from "../models/News.js";
import User from "../models/User.js";

export const createNewsService = async (body) => News.create(body);

export const findAllNewsService = async (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const topNewsService = async () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const countNewsService = async () => News.countDocuments();

export const findNewsByIdService = async (postId) =>
  News.findById(postId).populate("user");

export const searchNewsByTitleService = async (title) =>
  News.find({
    title: {
      $regex: `${title || ""}`,
      $options: "i",
    },
  })
    .sort({ _id: -1 })
    .populate("user");

export const newsByUserService = async (userId) =>
  News.find({ user: userId }).sort({ _id: -1 }).populate("user");

export const updateNewsService = async (postId, title, text, banner) =>
  News.findOneAndUpdate({ _id: postId }, { title, text, banner });

export const deleteNewsService = async (postId) =>
  News.findOneAndDelete({ _id: postId });

export const likeNewsService = async (postId, userId) =>
  News.findOneAndUpdate(
    { _id: postId, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

export const unlikeNewsService = async (postId, userId) =>
  News.findOneAndUpdate({ _id: postId }, { $pull: { likes: { userId } } });

export const commentNewsService = async (postId, comment, userId) => {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36);
  return News.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        comments: {
          commentId,
          userId,
          comment,
          createdAt: new Date(),
        },
      },
    }
  );
};

export const deleteCommentService = async (postId, commentId, userId) => {
  return News.findOneAndUpdate(
    { _id: postId },
    {
      $pull: {
        comments: {
          commentId,
          userId,
        },
      },
    }
  );
};
