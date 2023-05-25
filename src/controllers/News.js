import { Router } from "express";
const router = Router();
import authenticateMiddleware from "../middlewares/authenticate.js";

//importe as funções do Services
import {
  findAllNews,
  createNews,
  countNews,
  topNews,
  findNewsById,
  searchNewsByTitle,
  newsByUser,
  updateNews,
  deleteNews,
} from "../services/News.js";

router.post("/", authenticateMiddleware, async (req, res) => {
  const currentUser = req.currentUser;

  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).json({ message: "submit all fields for registration" });
    }

    const news = await createNews({
      user: currentUser.id,
      title,
      text,
      banner,
    });

    res.status(201).json({ message: "News created successfully!", news });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;

  const totalNews = await countNews();
  const currentUrl = req.baseUrl;

  const next = offset + limit;
  const prev = offset - limit;

  const nextUrl =
    next < totalNews ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const prevUrl =
    prev < totalNews ? `${currentUrl}?limit=${limit}&offset=${prev}` : null;

  try {
    const news = await findAllNews(offset, limit);
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
});

router.get("/topnews", async (req, res) => {
  try {
    const news = await topNews();

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
});

router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchNewsByTitle(title);

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
});

router.get("/newsbyuser", authenticateMiddleware, async (req, res) => {
  try {
    const { id } = req.currentUser;
    const news = await newsByUser(id);

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
});

router.get("/:id", authenticateMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findNewsById(id);

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
});

router.patch("/:id", authenticateMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, banner } = req.body;
    console.log("entrou no try");

    if (!title && !text && !banner) {
      res
        .status(400)
        .json({ message: "Submit at least one field to update the post" });
    }

    const news = await findNewsById(id);

    if (news.user._id != req.currentUser.id) {
      res.status(400).json({ message: "You didn't update this post" });
    }

    await updateNews(id, title, text, banner);
    return res.json({ message: "post successfully updated!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authenticateMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findNewsById(id);

    if (news.user._id != req.currentUser.id) {
      res.status(400).json({ message: "You didn't update this post" });
    }

    await deleteNews(id);
    return res.json({ message: "post successfully deleted!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
export default router;
