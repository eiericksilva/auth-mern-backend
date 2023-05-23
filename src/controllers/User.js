import { Router } from "express";
import {
  createUser,
  getUserByEmail,
  getAllUsers,
  getFullUserByEmail,
} from "../services/User.js";
import generateToken from "../helpers/generateToken.js";
import bcryptjs from "bcryptjs";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = getUserByEmail(email);

  if (await userExists) {
    return res.status(400).json("User already exists");
  }

  if (!email || !password || !username) {
    return res.status(400).json("Email and Password are required fields");
  }

  try {
    const user = await createUser(req.body);
    const token = await generateToken(user.id);
    res.status(201).json({ message: "user created successfully", user, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getFullUserByEmail(email);

    if (!user) {
      return res.status(400).json("Email or password do not match");
    }

    const passwordIsEqual = await bcryptjs.compare(password, user.password);

    if (!passwordIsEqual) {
      return res.status(400).json("Email or password do not match");
    }

    const token = await generateToken(user.id);

    res.status(200).json({ message: "User is authenticated", user, token });
  } catch (error) {
    res.status(400).json("error.message");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default router;
