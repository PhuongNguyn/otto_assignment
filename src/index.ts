import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import appRoute from "./routes";
import setupSwagger from "./swagger";
import seedCategories from "./utils/initCategory";
import dotenv from "dotenv";
import errorHandling from "./middlewares/error-handling.middleware";

const app: Application = express();

app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.CONNECTION_STRING || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Init swagger
setupSwagger(app);

// Define routes
appRoute(app);
app.use(errorHandling);

// Init some category
seedCategories();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
