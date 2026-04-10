import { Router } from "express";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { validateUser } from "../db/validation";

const router = Router();
router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (!result.success) {
    return res.json({message: "Validation failed",errors: result.issues,});
  }
  const { name, email} = result.output;
  const exist = await db.select().from(users).where(eq(users.email, email));
  if (exist.length >0) {
    return res.json({ message: "user already exist with this mail id",});
  }

  const user = await db.insert(users).values({name,email }).returning();
  res.json({ message: "user created", user: user[0],
  });
});

router.get("/", async(req, res)=>{
  const allUser= await db.select().from(users);
  return res.json({message: "all users list", allUser});
})

router.get("/:id", async(req, res)=>{
  const id=Number(req.params.id);
  const user= await db.select().from(users).where(eq(users.id, id));
  if(user.length==0){
    return res.json({message: `user with id: ${id} not exist`});
  }
  return res.json({message: `user with id: ${id}`, user});
  
})
export default router;