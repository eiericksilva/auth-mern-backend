import express from "express";
import cors from "cors";
import connectDB from "./database/mongodb.js";
import "./database/mongodb.js";

const app = express();
connectDB();

import UserController from "./controllers/User.js";
import AuthController from "./controllers/Auth.js";
import AdminController from "./controllers/Admin.js";

app.use(express.json());
app.use(cors());

app.use("/user", UserController);
app.use("/auth", AuthController);
app.use("/admin", AdminController);

app.listen(3001, () => {
  console.log(`server is running`);
});
