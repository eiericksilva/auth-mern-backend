import { Router } from "express";
const router = Router();
import { editUser } from "../services/Admin.js";

router.put("/user", async (req, res) => {
  const currentUser = req.currentUser;
  try {
    const user = await editUser(currentUser.id, req.body);
    res
      .status(200)
      .json({ message: "usuário editado com sucesso!", currentUser });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
