import { PgTable, serial, text, integer, timestamp, varchar, primaryKey } from "drizzle-orm/pg-core";
import { pgTable,} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length:100}),
  email: varchar("email",{length:100}).unique(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique().references(()=>users.id),
  bio: text("bio"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: integer("price"),
  description: text("description"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
 name: text("name"),
});

export const productCategories = pgTable("product_categories",{ 
  productId: integer("product_id").notNull().references(() => products.id),
    categoryId: integer("category_id").notNull().references(() => categories.id),
  },(t) => ({
    pk: primaryKey({ columns: [t.productId,t.categoryId]}),
  })
);



export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity"),
});



export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique().references(()=>users.id),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => carts.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity"),
});