import express from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { cartItems, carts, categories, orderItems, orders, products } from "../db/schema";

const router=express.Router();


router.post("/checkout", async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        return res.json({message:"userId requred"});
    }

    const userCart=await db.select().from(carts).where(eq(carts.userId, userId));
    if(userCart.length===0){
        return res.json({message: "user cart is empty"}); 
    }

    const cartId= userCart[0].id;
    const items =   await db.select({id:cartItems.id, productId: cartItems.productId, stock: products.stock, quantity: cartItems.quantity, name: products.name}).from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id)).where(eq(cartItems.cartId, cartId));
    if(items.length===0){
        return res.json({message: "cart is empty"});
    }

    const outofStock = items.filter((item)=>item.quantity>item.stock);  
    if(outofStock.length>0){ 
        return res.json({message: 'insufficient stock', items: outofStock.map((i)=>({name: i.name, available: i.stock, requested: i.quantity})),})
    }

    const newOrder=await db.insert(orders).values({userId}).returning();
    const orderId=newOrder[0].id;

  for (const item of items) {
      await db.insert(orderItems).values({orderId, productId: item.productId, quantity: item.quantity,});

      await db.update(products).set({ stock: item.stock-item.quantity }).where(eq(products.id, item.productId));
    }

    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

    res.json({message: "order placed", orderId});

});

router.get("/:userId", async(req, res)=>{
    const userId = Number(req.params.userId);
    const userOrder=await db.select().from(orders).where(eq(orders.userId, userId));
    const result=[];

    for (const order of userOrder) {
      const items = await db.select({ productId: orderItems.productId, quantity: orderItems.quantity,
          name: products.name,
          price: products.price,
        }).from(orderItems).innerJoin(products, eq(orderItems.productId, products.id)).where(eq(orderItems.orderId, order.id));

      result.push({...order,items,total: items.reduce((sum, i) => sum+i.price* i.quantity, 0),
      });
    }
    res.json(result);
  
});

export default router;