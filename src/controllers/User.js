import { Router } from "express";
import { createUser, getUserByEmail, getAllUsers } from "../services/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userExists = getUserByEmail(email);

  if (await userExists) {
    return res.status(400).json("User already exists");
  } else {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json("User not found");
  }

  return res.json(user);
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
