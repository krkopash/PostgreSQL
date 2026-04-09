import { Router } from "express";
import { db } from "../db";
import { users } from "../db/schema";

const router = Router();

router.post("/", async (req, res) => {
  const {name, email } = req.body;
  const user = await db.insert(users).values({ name,email}).returning();
  res.json(user);
});

export default router;