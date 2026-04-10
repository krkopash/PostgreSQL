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

import orderRoute from './routes/order';;
app.use("/orders", orderRoute);

export default app;

