import { Router } from "express";
import { db } from "../db";
import { products, productCategories, categories } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { and,or,like } from "drizzle-orm";

const router = Router();

router.post("/add", async (req, res) => {
    const {name, price, description, stock,categoryIds, categoryNames}=req.body;
 if (!name ||!price) {
       return res.json({ message:"name & price required" });
     }

    let finalCategoryId:number[]=[];

    if(categoryIds && Array.isArray(categoryIds)){
        finalCategoryId=[...categoryIds];
    }

    if(categoryNames && Array.isArray(categoryNames) && categoryNames.length>0){
        const existCategory=await db.select().from(categories).where(inArray(categories.name, categoryNames));
        const foundNames=existCategory.map((c)=>c.name);
        const missingName=categoryNames.filter((name)=>!foundNames.includes(name));

        if(missingName.length>0){
            return res.json({message:"category not exist", missingCategories: missingName});
        }  
        const foundIds=existCategory.map((c)=>c.id);
        finalCategoryId=[...new Set([...finalCategoryId, ...foundIds])];

    }

    const newProduct = await db.insert(products).values({name,price,description, stock:stock||0 }).returning();

    const productId=newProduct[0].id;

 if (finalCategoryId.length > 0) {
      const values = finalCategoryId.map((catId: number) => ({productId,categoryId: catId,}));
      await db.insert(productCategories).values(values);
    }
    res.json({ message: "Product added successfully", product: newProduct[0],categories: finalCategoryId, categoryName: categoryNames});
 
});



router.get("/", async (req, res) => {
    const { categoryId } = req.query;
    const result = await db.select({
        id: products.id,
        name: products.name,
        price: products.price,
        description: products.description,
        stock: products.stock,
        categoryName: categories.name,
      }).from(products).leftJoin(productCategories, eq(products.id, productCategories.productId))
      .leftJoin(categories, eq(productCategories.categoryId, categories.id))
      .where(categoryId ? eq(productCategories.categoryId, Number(categoryId)) : undefined);

    const productsMap = new Map();
    result.forEach((row) => {
      if (!productsMap.has(row.id)) {
        productsMap.set(row.id, {
          id: row.id,
          name: row.name,
          price: row.price,
          description: row.description,
          stock: row.stock,
          categories: [],
        });
      }
    });

    res.json(Array.from(productsMap.values()));
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const product = await db.select().from(products).where(eq(products.id, id));
    if (product.length===0) {
      return res.json({ error: `Product with id ${id} not found` });
    }
    res.json(product[0]);
});

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, price, description, stock } = req.body;

    const exist = await db.select().from(products).where(eq(products.id, id));
    if (exist.length=== 0){
      return res.json({ error: `Product with id ${id} not found` });
    }
    const updatedProduct = await db.update(products).set({ name,price, description, stock }).where(eq(products.id,id)).returning();
    res.json({ message: "Product updated successfully", product: updatedProduct[0] });
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const exist = await db.select().from(products).where(eq(products.id, id));

    if (exist.length===0) {
      return res.json({ error: `Product with id ${id} not found` });
    }
    await db.delete(products).where(eq(products.id, id));
    res.json({ message: `Product deleted: id-${id}` });
  });

export default router;