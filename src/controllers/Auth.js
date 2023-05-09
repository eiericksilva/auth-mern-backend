import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  return res.json({ error: false, message: "registered with success" });
});

export default router;
