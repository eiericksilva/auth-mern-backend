import News from "../models/News.js";

export const createNews = async (body) => News.create(body);

export const findAllNews = async (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const topNews = async () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const countNews = async () => News.countDocuments();

export const findNewsById = async (id) => News.findById(id).populate("user");

export const searchNewsByTitle = async (title) =>
  News.find({
    title: {
      $regex: `${title || ""}`,
      $options: "i",
    },
  })
    .sort({ _id: -1 })
    .populate("user");

export const newsByUser = async (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateNews = async (id, title, text, banner) =>
  News.findOneAndUpdate({ _id: id }, { title, text, banner });

export const deleteNews = async (id) => News.findOneAndDelete({ _id: id });
