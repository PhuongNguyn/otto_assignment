import { Request, Response } from "express";
import Category from "../models/category.model";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
