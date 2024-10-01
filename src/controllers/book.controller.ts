import { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import Category from "../models/category.model";

export const getPagingBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 1;
    const pageSize = 100;
    const books = await Book.find()
      .skip(pageSize * pageIndex - pageSize)
      .limit(pageSize);

    const countBooks = await Book.countDocuments();
    res.status(200).json({ books, total: countBooks });
  } catch (err: any) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ book });
  } catch (err: any) {
    next(err);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, price, author, category, review, isbn } = req.body;

  // Check if category exists
  const validCategory = await Category.findById(category);

  if (!validCategory) {
    res.status(400).json({ message: "Invalid category" });
    return;
  }

  const book = new Book({ title, price, author, category, review, isbn });

  try {
    const newBook = await book.save();
    res.status(201).json({ newBook });
  } catch (err: any) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.body;

    // Check if category exists
    if (category) {
      const validCategory = await Category.findById(category);
      if (!validCategory) {
        res.status(400).json({ message: "Invalid category" });
        return;
      }
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ book: updatedBook });
  } catch (err: any) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book deleted" });
  } catch (err: any) {
    next(err);
  }
};
