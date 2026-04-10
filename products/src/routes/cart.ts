import { Router } from "express";
import { db } from "../db";
import { carts, cartItems, products } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { message } from "valibot";

const router = Router();
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if(!userId ||!productId||!quantity===undefined){
    return res.json({message:"userid, prodid, quantity required"});
  }

  let cart = await db.select().from(carts).where(eq(carts.userId, userId));
  let cartId;
  if (cart.length === 0) {
    const newCart = await db.insert(carts).values({userId}).returning();
    cartId=newCart[0].id;
  } 

  else {
    cartId=cart[0].id;
  }
  const existingItem = await db.select().from(cartItems).where(and(eq(cartItems.productId, productId),eq(cartItems.cartId,cartId)));

  if (existingItem.length > 0) {
  const updatedItem = await db.update(cartItems).set({ quantity: existingItem[0].quantity + (quantity||1) })
      .where(eq(cartItems.id, existingItem[0].id)).returning();
    res.json({ message: "quantity updated", item: updatedItem[0] });

  } else {
   const newItem = await db.insert(cartItems).values({cartId, productId, quantity: quantity||1}).returning();
    res.json({ message: "Added to cart", item: newItem[0]});
  }
  res.json({ message: "Added to cart" });
});

router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const cart = await db.select().from(carts).where(eq(carts.userId, userId));
  if (cart.length === 0) {
    return res.json({message:"cart is empty", items:[]});
  }

  const items = await db.select({id: cartItems.id,
        quantity: cartItems.quantity,
        productId: products.id,
        productName: products.name,
        productPrice: products.price,}).from(cartItems).leftJoin(products, eq(cartItems.productId, products.id)). where(eq(cartItems.cartId, cart[0].id));
  res.json({cartId: cart[0].id, items, total: items.reduce((sum, item) => sum + (item.productPrice|| 0) * (item.quantity || 0), 0),});
});

router.patch("/item/:itemId", async(req, res)=>{
  const itemId= Number(req.params.itemId);
  const {quantity}=req.body;
  if(quantity===undefined||quantity<0){
    return res.json({message: "invalid number of quantity"});
  }
    if(quantity===0){
      await db.delete(cartItems).where(eq(cartItems.id, itemId));
      return res.json({message: "item deleted"});
    }

    const updatedItem =await db.update(cartItems).set({quantity}).where(eq(cartItems.id, itemId)).returning();
    if(updatedItem.length===0){
      return res.json({message:"cart not found"});
    }
    return res.json({message:"cart updated", items: updatedItem[0]});

})


router.delete("/remove/:itemId", async (req, res) => {
  const itemId = Number(req.params.itemId);
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
  res.json({ message:"remove item"});
});

router.delete("/clear/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const cart = await db.select().from(carts).where(eq(carts.userId, userId));
  if (cart.length === 0) {
    return res.json({message:"Cart empty"});
  }
  await db.delete(cartItems).where(eq(cartItems.cartId, cart[0].id));
  res.json({ message:"clear" });
});

export default router;