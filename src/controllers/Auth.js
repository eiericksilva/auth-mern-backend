import { Router } from "express";
const router = Router();
import { getFullUserByEmail } from "../services/Auth.js";
import bcryptjs from "bcryptjs";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getFullUserByEmail(email);

    if (!user) {
      return res.status(400).send("User or Password not found");
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send("User or Password not found");
    }
    res.status(200).send("login ok");
  } catch (error) {
    res.status(400).send("error.message");
  }
});

export default router;
