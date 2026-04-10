import { Router } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { categories } from "../db/schema";

const router=Router();

router.post("/add", async (req, res)=>{
    const {name}= req.body;
    if(!name){
        return res.json({message: "category name is required"});
    }
    const newCat=await db.insert(categories).values({name}).returning();

    res.json(newCat[0]);
});

router.post("/", async(req, res)=>{
    const allCat=await db.select().from(categories);
    res.json(allCat);
})

router.delete("/:id", async(req, res)=>{
    const id=Number(req.params.id);
    await db.delete(categories).where(eq(categories.id,id));
    res.json({message:`category deleted: ${id}`, })


})

export default router;