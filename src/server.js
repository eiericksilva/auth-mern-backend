import express from "express";
import cors from "cors";
import connectDB from "./database/mongodb.js";
import "./database/mongodb.js";

import UserRouter from "./routes/User.js";
import NewsRouter from "./routes/News.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/news", NewsRouter);

app.listen(3001, () => {
  console.log(`server is running`);
});
