import { Router } from "express";
const router = Router();

import {
  findAllNewsService,
  createNewsService,
  countNewsService,
  topNewsService,
  findNewsByIdService,
  searchNewsByTitleService,
  newsByUserService,
  updateNewsService,
  deleteNewsService,
  likeNewsService,
  unlikeNewsService,
  commentNewsService,
  deleteCommentService,
} from "../services/News.js";

const createNews = async (req, res) => {
  const currentUser = req.currentUser;

  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).json({ message: "submit all fields for registration" });
    }

    const news = await createNewsService({
      user: currentUser.id,
      title,
      text,
      banner,
    });

    res.status(201).json({ message: "News created successfully!", news });
  } catch (error) {
    res.status(400).json(error);
  }
};

const findAllNews = async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;

  const totalNews = await countNewsService();
  const currentUrl = req.baseUrl;

  const next = offset + limit;
  const prev = offset - limit;

  const nextUrl =
    next < totalNews ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const prevUrl =
    prev < totalNews ? `${currentUrl}?limit=${limit}&offset=${prev}` : null;

  try {
    const news = await findAllNewsService(offset, limit);
    res.status(200).json({
      nextUrl,
      prevUrl,
      limit,
      offset,
      totalNews,
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        username: item.user.username,
      })),
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTopNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ message: "There is no registered post" });
    }

    res.status(200).send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        username: news.user.username,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const searchNewsByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchNewsByTitleService(title);

    if (news.length === 0) {
      return res
        .status(400)
        .json({ message: "There are no news with this title" });
    }
    return res.status(200).json({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        username: item.user.username,
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNewsByUser = async (req, res) => {
  try {
    const { id } = req.currentUser;
    const news = await newsByUserService(id);

    return res.status(200).json({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        username: item.user.username,
      })),
    });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const findNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findNewsByIdService(id);

    if (!news) {
      res.status(400).json({ message: "There is no News with this id" });
    }
    return res.status(200).json({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        username: news.user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, banner } = req.body;

    if (!title && !text && !banner) {
      res
        .status(400)
        .json({ message: "Submit at least one field to update the post" });
    }

    const news = await findNewsByIdService(id);

    if (news.user._id != req.currentUser.id) {
      res.status(400).json({ message: "You didn't update this post" });
    }

    await updateNewsService(id, title, text, banner);
    return res.json({ message: "post successfully updated!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const postId = req.params.id;
    const news = await findNewsByIdService(postId);

    if (news.user._id != req.currentUser.id) {
      res.status(400).json({ message: "You didn't update this post" });
    }

    await deleteNewsService(postId);
    return res.json({ message: "post successfully deleted!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const likeNews = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.currentUser.id;

    const newsLiked = await likeNewsService(postId, userId);
    if (!newsLiked) {
      await unlikeNewsService(postId, userId);
      return res.status(200).json({ message: "Post unliked" });
    }

    return res.json({ message: "Post liked" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const commentNews = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.currentUser.id;

    if (!comment) {
      return res.status(400).json({ message: "Write a message to comment" });
    }

    await commentNewsService(postId, comment, userId);

    return res.status(201).json({ message: "Comment successfully created" });
  } catch (error) {}
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.currentUser.id;

    const commentDeleted = await deleteCommentService(
      postId,
      commentId,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.commentId === commentId
    );
    if (commentFinder.userId !== userId) {
      return res.status(400).json({ message: "You can't delete this comment" });
    }
    return res.status(201).json({ message: "Comment successfully removed" });
  } catch (error) {}
};

export default {
  createNews,
  findAllNews,
  getTopNews,
  searchNewsByTitle,
  getNewsByUser,
  findNewsById,
  updateNewsById,
  deleteNews,
  likeNews,
  commentNews,
  deleteComment,
};
