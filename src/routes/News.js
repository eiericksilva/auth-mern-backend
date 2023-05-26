import { Router } from "express";
const NewsRouter = Router();

import newsController from "../controllers/News.js";
import authenticateMiddleware from "../middlewares/authenticate.js";

NewsRouter.post("/", authenticateMiddleware, newsController.createNews);

NewsRouter.get("/", newsController.findAllNews);
NewsRouter.get("/topnews", newsController.getTopNews);
NewsRouter.get("/search", newsController.searchNewsByTitle);
NewsRouter.get(
  "/newsbyuser",
  authenticateMiddleware,
  newsController.getNewsByUser
);
NewsRouter.get("/:id", authenticateMiddleware, newsController.findNewsById);

NewsRouter.patch("/:id", authenticateMiddleware, newsController.updateNewsById);

NewsRouter.delete("/:id", authenticateMiddleware, newsController.deleteNews);

NewsRouter.patch(
  "/like/:postId",
  authenticateMiddleware,
  newsController.likeNews
);
NewsRouter.patch(
  "/comment/:postId",
  authenticateMiddleware,
  newsController.commentNews
);
NewsRouter.patch(
  "/comment/:postId/:commentId",
  authenticateMiddleware,
  newsController.deleteComment
);

export default NewsRouter;
