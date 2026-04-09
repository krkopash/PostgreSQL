import { Router } from "express";
import { db } from "../db";
import { products, productCategories, categories } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/addcat", async(req,res)=>{
    const {name, price, description, categoryIds}=req.body;
    const newProd=await db.insert(products).values({name,price,description}).returning();
    const productId=newProd[0].id;
    if(categoryIds && categoryIds.length>0){
        const values = categoryIds.map((catId: number)=>({
            productId, categoryId:catId,
        }));
        await db.insert(productCategories).values(values);
    }
    res.json({message:"product added with category", product:newProd[0]})
});

router.get("/prodwithcat", async (req, res) => {
  const result = await db
    .select({productId: products.id,
      productName: products.name,
      productPrice: products.price,
      catName: categories.name,
    }).from(products).leftJoin( productCategories,eq(products.id, productCategories.productId))
    .leftJoin(categories,eq(productCategories.categoryId, categories.id));

  res.json(result);
});




router.post("/add", async (req, res) => {
    const { name, price } = req.body;
if (!name ||!price) {
      return res.json({ message:"name & price required" });
    }
    const newProduct = await db.insert(products).values({name,price }).returning();
    res.json({ message: "add product",product: newProduct[0],});
});


router.get("/", async (req, res) => {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
});


router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const product = await db.select().from(products).where(eq(products.id, id));
    if (product.length === 0) {
      return res.json({ message: `product not exist with id ${id}`});
    }
    res.json(product[0]);
});


router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const exist=await db.select().from(products).where(eq(products.id,id));
    
if(exist.length===0)
    {
        return res.json({error: `product not exist with product id: ${id}`});
    }

    await db.delete(products).where(eq(products.id, id));
    return res.json({ message: `Product deleted: id-${id}`});
});

export default router;