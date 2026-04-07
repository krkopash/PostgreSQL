import { Router } from "express";
import { db } from "../db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";


const router = Router();

router.get("/", async(req,res)=>{
    const result =await db.select().from(todos);
    res.json(result);
});

router.post("/", async (req, res)=>{
    const {title}=req.body;
    const result =await db.insert(todos).values({title}).returning();
    res.json({"title added": result})
});

router.put("/:id" ,async (req, res)=>{
    const {completed}=req.body;
    const id=Number(req.params.id);
    const result= await db.update(todos).set({completed}).where(eq(todos.id, id)).returning();
    res.json(result);
});

router.delete("/:id", async(req, res)=>{
    const id=Number(req.params.id);
    await db.delete(todos).where(eq(todos.id, id)).returning();
    res.json({"user deleted of id": id})
});

export default router;