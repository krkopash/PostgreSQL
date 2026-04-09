// import {
//   pgTable,
//   serial,
//   text,
//   integer,
//   primaryKey,
// } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
// });

// export const profiles = pgTable("profiles", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").unique().references(() => users.id),
//   bio: text("bio"),
// });
// export const usersRelations = relations(users, ({ one }) => ({
//   profile: one(profiles),
// }));

// export const profilesRelations = relations(profiles, ({ one }) => ({
//   user: one(users, {
//     fields: [profiles.userId],
//     references: [users.id],
//   }),
// }));

// export const orders = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").references(() => users.id),
// });

// export const ordersRelations = relations(orders, ({ one }) => ({
//   user: one(users, {
//     fields: [orders.userId],
//     references: [users.id],
//   }),
// }));

// export const usersOrdersRelations = relations(users, ({ many }) => ({
//   orders: many(orders),
// }));

// export const products = pgTable("products", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
// });

// export const categories = pgTable("categories", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
// });

// export const productCategories = pgTable(
//   "product_categories",
//   {
//     productId: integer("product_id").references(() => products.id),
//     categoryId: integer("category_id").references(() => categories.id),
//   },
//   (t) => ({
//     pk: primaryKey({ columns: [t.productId, t.categoryId] }),
//   })
// );

// export const productsRelations = relations(products, ({ many }) => ({
//   productCategories: many(productCategories),
// }));

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   productCategories: many(productCategories),
// }));

// export const productCategoriesRelations = relations(
//   productCategories,
//   ({ one }) => ({
//     product: one(products, {
//       fields: [productCategories.productId],
//       references: [products.id],
//     }),
//     category: one(categories, {
//       fields: [productCategories.categoryId],
//       references: [categories.id],
//     }),
//   })
// );