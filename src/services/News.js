import News from "../models/News.js";

export const createNews = async (body) => {
  const news = await News.create(body);
  return news;
};

export const findAllNews = async (offset, limit) => {
  const news = await News.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
  return news;
};

export const topNews = async () => {
  const topNews = News.findOne().sort({ _id: -1 }).populate("user");
  return topNews;
};

export const countNews = async () => News.countDocuments();

export const findNewsById = async (id) => News.findById(id).populate("user");
