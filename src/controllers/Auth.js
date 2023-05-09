import { Router } from "express";
const router = Router();
import { getFullUserByEmail, generateToken } from "../services/Auth.js";
import bcryptjs from "bcryptjs";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getFullUserByEmail(email);

    if (!user) {
      return res.status(400).json("User or Password not found");
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json("User or Password not found");
    }

    const token = generateToken(user.id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json("error.message");
  }
});

export default router;
