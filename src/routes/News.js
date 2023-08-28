import { Router } from "express";
const NewsRouter = Router();

import newsController from "../controllers/News.js";
import authenticateMiddleware from "../middlewares/authenticate.js";

NewsRouter.post("/", authenticateMiddleware, newsController.createNews);

NewsRouter.get("/", newsController.findAllNews);
NewsRouter.get("/top", newsController.getTopNews);
NewsRouter.get("/search", newsController.searchNewsByTitle);
NewsRouter.get(
  "/newsbyuser",
  authenticateMiddleware,
  newsController.getNewsByUser
);
NewsRouter.get("/:postId", authenticateMiddleware, newsController.findNewsById);
NewsRouter.patch("/:postId", authenticateMiddleware, newsController.updateNews);

NewsRouter.delete(
  "/:postId",
  authenticateMiddleware,
  newsController.deleteNews
);

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
