import { Router } from "express";
const router = Router();

//importe as funções do Services
import { findAllNews, createNews } from "../services/News.js";

router.post("/", async (req, res) => {
  const currentUser = req.currentUser;
  console.log("req.currentUser from Controller:", req.currentUser);

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
  try {
    const news = await findAllNews();
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
