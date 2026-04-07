import express from "express";
import todoRoutes from "./routes/todo";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

const PORT = process.env.PORT||3000;

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});