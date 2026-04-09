import express from "express";
import router from "./routes/user";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});
import productRoutes from './routes/product';

app.use("/products", productRoutes);

import cartRoutes from "./routes/cart";
app.use("/user", router);

import categoryRoutes from "./routes/category"
app.use("/cat", categoryRoutes);
app.use("/cart", cartRoutes);

export default app;


/*
POST /cart/add
{
  "userId": 1,
  "productId": 2,
  "quantity": 1
}
  GET /cart/1
  DELETE /cart/remove/1
  DELETE /cart/clear/1
  
*/