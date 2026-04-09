import { Router } from "express";
import { db } from "../db";
import { categories } from "../db/schema";

const router=Router();

router.post("/add", async (req, res)=>{
    const {name}= req.body;
    const newCat=await db.insert(categories).values({name}).returning();

    res.json(newCat[0]);
});

router.post("/", async(req, res)=>{
    const allCat=await db.select().from(categories);
    res.json(allCat);
})

export default router;