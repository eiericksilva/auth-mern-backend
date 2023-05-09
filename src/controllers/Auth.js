import { Router } from "express";
import { createUser, verifyIfUserExists } from "../services/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userExists = verifyIfUserExists(email);

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

export default router;
