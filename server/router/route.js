import { Router } from "express";

const router = Router();

router.route("/register").post((req, res) => {
  return res.json("Register route");
});

export default router;
