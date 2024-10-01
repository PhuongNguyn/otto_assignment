import bookRoutes from "./book.route";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import express from "express";

const appRoute = (app: express.Application) => {
  app.use("/books", bookRoutes);
  app.use("/auth", authRoutes);
  app.use("/category", categoryRoutes);
};

export default appRoute;
