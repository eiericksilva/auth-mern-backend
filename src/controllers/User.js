import { Router } from "express";
import { createUser, getUserByEmail } from "../services/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userExists = getUserByEmail(email);

  if (await userExists) {
    return res.status(400).send("User already exists");
  } else {
    try {
      const user = await createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).send("User not found");
  }

  return res.json(user);
});

export default router;
