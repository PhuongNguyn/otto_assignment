import bookRoutes from "./book.route";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import express from "express";

const appRoute = (app: express.Application) => {
  app.use("/api/books", bookRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/category", categoryRoutes);
};

export default appRoute;
