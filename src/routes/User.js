import { Router } from "express";
const UserRouter = Router();

import userController from "../controllers/User.js";

UserRouter.post("/register", userController.register);
UserRouter.post("/login", userController.login);
UserRouter.get("/", userController.getAll);

export default UserRouter;
