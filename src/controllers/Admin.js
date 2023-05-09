import { Router } from "express";
const router = Router();
import { editUser } from "../services/Admin.js";

router.put("/user/:id", async (req, res) => {
  try {
    const user = await editUser(req.params.id, req.body);
    res.status(200).json("Usuário editado com sucesso!");
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
