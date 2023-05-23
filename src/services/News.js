import News from "../models/News.js";

export const createNews = async (body) => {
  const news = await News.create(body);
  return news;
};

export const findAllNews = async (id, payload) => {
  const news = [];
  const user = await News.find();
  return user;
};
